import { Compiler } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin'

import createPolyfillUrl from './helpers/create-polyfill-url'

import { PluginOptions, JsAssets } from './interface';

const PLUGIN_NAME = 'HtmlWebpackPolyfillRunTimePlugin';

class HtmlWebpackPolyfillRunTimePlugin {
  options: PluginOptions

  constructor(options: PluginOptions = {}) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    if (!HtmlWebpackPlugin.getHooks) {
      throw new Error('just support HtmlWebpackPlugin@4.x');
    }

    // HtmlWebpackPlugin version 4.x
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        PLUGIN_NAME,
        async (data, callback) => {

          const jsAssets = Object.keys(compilation.assets)
            .filter(key => /js$/.test(key))
            .reduce((obj, key) => {
              obj[key] = compilation.assets[key];
              return obj;
            }, {} as Record<string, JsAssets>);


          const url = await createPolyfillUrl(jsAssets, this.options);

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

export = HtmlWebpackPolyfillRunTimePlugin