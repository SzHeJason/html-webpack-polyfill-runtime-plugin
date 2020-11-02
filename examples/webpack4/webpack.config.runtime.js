const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPolyfillRuntimePlugin = require('../..');

module.exports = {
  entry: "./app.js",
  mode: "production",
  resolve: {
    symlinks: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: [
                'defaults',
                'Chrome > 33',
                'ios_saf > 7',
                'android > 4.4',
              ],
            }]]
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(), new HtmlPolyfillRuntimePlugin()],
}