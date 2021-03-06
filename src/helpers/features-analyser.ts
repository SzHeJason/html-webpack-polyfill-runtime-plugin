import os from 'os'
import path from 'path'
import webpack from 'webpack'
import fs from 'fs-extra'

import * as babel from '@babel/core'


import jsFeaturesAnalyser from '@financial-times/js-features-analyser/src/index'

import * as utils from './utils'

export default async function getJsFeature(assetsMap: Record<string, webpack.sources.Source>) {
  if (!utils.isObject(assetsMap)) {
    return Promise.reject(
      new Error('bad params ,assetsMap must be webpack assets object')
    );
  }

  const tempFolder = await fs.mkdtemp(
    path.join(os.tmpdir(), 'js-features-analyser')
  );
  const outputDestination = path.join(tempFolder, 'features.json');

  const actions: Promise<string[]>[] = Object.values(assetsMap).map(assets => {
    return new Promise((resolve, reject) => {
      try {
        babel.transformSync(assets.source().toString(), {
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
    const result: Record<string, string[]> = {};

    Object.keys(assetsMap).forEach((file, key) => {
      result[file] = res[key];
    });

    return result;
  });
}