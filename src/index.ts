import { Compiler } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin'
import createPolyfillUrl from './helpers/create-polyfill-url'

const PLUGIN_NAME = 'HtmlWebpackPolyfillRunTimePlugin';

export interface PluginOptions {
  browserslist?: string | ReadonlyArray<string>,
  /**
   * 自定义 url
   * @tip 返回 undefined 代表使用 polyfil.io 的 url
   */
  url?: (features: string[], featureMap: Record<string, string[]>) => string | undefined
}

export interface JsAssets {
  source: () => string
}


export class HtmlWebpackPolyfillRunTimePlugin {
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


module.exports = HtmlWebpackPolyfillRunTimePlugin