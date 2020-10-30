import browserslist from 'browserslist'
import createPolyfillUrl from 'create-polyfill-service-url/src/index';

import * as utils from './utils'
import featureAnalyser from './features-analyser'

import { JsAssets, PluginOptions } from '../index';


export default async function getPolyfillUrl(assetsMap: Record<string, JsAssets>, options: PluginOptions) {
  const { url, browserslist: browserslistConfig } = options;

  const browsers = browserslist(browserslistConfig, {
    path: process.cwd(),
  });

  const featureMap = await featureAnalyser(assetsMap);

  const featureList = Object.values(featureMap).reduce(
    (carry, item) => [...carry, ...item],
    []
  );
  const uniqueFeatureList = utils.unique(featureList);

  const result = await createPolyfillUrl(uniqueFeatureList, browsers);

  if (
    result.type === createPolyfillUrl.TYPE_URL &&
    utils.isFunction(url)
  ) {
    result.message = url(uniqueFeatureList, featureMap) || result.message;
  }

  return result.message;
}