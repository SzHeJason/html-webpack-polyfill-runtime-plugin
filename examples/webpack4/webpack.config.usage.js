const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./app.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: 3,
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
  plugins: [new HtmlWebpackPlugin()],
}