/* eslint-disable no-console */
const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const babel = require('@babel/core');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const jsFeaturesAnalyser = require('@financial-times/js-features-analyser/src/index');
const createPolyfillUrl = require('create-polyfill-service-url/src/index');
const browserslist = require('browserslist');

const PLUGIN_NAME = 'HtmlWebpackPolyfillRunTimePlugin';

async function getJsFeature(assetsInfo) {
  if (typeof assetsInfo !== 'object' || assetsInfo === null) {
    return Promise.reject(
      new Error('bad params ,files must be webpack assets object')
    );
  }

  const tempFolder = await fs.mkdtemp(
    path.join(os.tmpdir(), 'js-features-analyser')
  );
  const outputDestination = path.join(tempFolder, 'features.json');

  const actions = Object.values(assetsInfo).map(assets => {
    return new Promise((resolve, reject) => {
      try {
        babel.transformSync(assets.source(), {
          plugins: [
            [
              jsFeaturesAnalyser,
              {
                outputDestination,
              },
            ],
          ],
          ast: false,
          code: false,
        });

        resolve(JSON.parse(fs.readFileSync(outputDestination, 'utf-8')));
      } catch (error) {
        reject(error.message);
      }
    });
  });

  return Promise.all(actions).then(res => {
    const result = {};

    Object.keys(assetsInfo).forEach((file, key) => {
      result[file] = res[key];
    });

    return result;
  });
}

async function getPolyfillUrl(assetsInfo, options = {}) {
  const { url } = options;
  const browsersListConfig = browserslist.loadConfig({
    path: process.cwd(),
  });
  const browsers = browsersListConfig ? browserslist(browsersListConfig) : [];

  const featureMap = await getJsFeature(assetsInfo);

  const featureList = Object.values(featureMap).reduce(
    (carry, item) => [...carry, ...item],
    []
  );
  const uniqueFeatureList = [...new Set(featureList)];

  const result = await createPolyfillUrl(uniqueFeatureList, browsers);

  if (
    result.type === createPolyfillUrl.TYPE_URL &&
    url &&
    {}.toString.call(url) === '[object Function]'
  ) {
    result.message =
      url({
        featureMap: featureMap,
        features: uniqueFeatureList,
      }) || result.message;
  }

  return result.message;
}

class HtmlWebpackPolyfillRunTimePlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // HtmlWebpackPlugin version 4.0.0-beta.5
    if (!HtmlWebpackPlugin.getHooks) {
      throw new Error('仅支持 HtmlWebpackPlugin@4.x 版本');
    }

    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        PLUGIN_NAME,
        async (data, callback) => {
          const jsAssets = Object.keys(compilation.assets)
            .filter(key => /js$/.test(key))
            .reduce((obj, key) => {
              obj[key] = compilation.assets[key];
              return obj;
            }, {});

          const url = await getPolyfillUrl(jsAssets, {
            url: this.options.url,
          });

          data.headTags.unshift({
            tagName: 'script',
            voidTag: false,
            attributes: {
              defer: false,
              src: url,
            },
          });

          callback(null, data);
        }
      );
    });
  }
}

module.exports = HtmlWebpackPolyfillRunTimePlugin