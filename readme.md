# HTML Webpack Polyfill Runtime Plugin

A [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) for auto injecting runtime polyfill script

This plugin make to you forget js polyfill 

## Install

```shell
# npm
npm install html-webpack-polyfill-runtime-plugin --save-dev
# yarn
yarn add html-webpack-polyfill-runtime-plugin -D
```

## Example

- [example/webpack4](https://github.com/SzHeJason/html-webpack-polyfill-runtime-plugin/tree/master/examples/webpack4)

webpack.config.js

````js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPolyfillRuntimePlugin = require('html-webpack-polyfill-runtime-plugin');

module.exports = {
  entry: "./app.js",
  mode: "production",
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
````

output html

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>Webpack App</title>
  <script
    src="https://polyfill.io/v3/polyfill.min.js?features=console,Function.prototype.bind,Map,Object.create,Object.defineProperty,Set,Symbol,Symbol.toStringTag"></script>
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>

<body>
  <script src="main.js"></script>
</body>

</html>
```

### Process
![image](https://user-images.githubusercontent.com/20609396/110198464-a3e34080-7e8d-11eb-9db8-dc759a0efdbb.png)


### Build private runtime polyfill service 

The plugin use [polyfill.io](https://polyfill.io/v3/)  by deafult，but you can makeprivate runtime polyfill service by [js-polyfill-docker](https://github.com/3YOURMIND/js-polyfill-docker) and override plugin url

```js
// webpack.config.js
const HtmlPolyfillRuntimePlugin = require('html-webpack-polyfill-runtime-plugin')

module.exports = function() {
	...,
	plugins:[
		...，
    // position of the plugin is last
		new HtmlPolyfillRuntimePlugin({
			url(features){
				return `https//yourpolyfill.service.com/pathname?features=${features.join(,)}`
			}
		})
	]
	...,
}
```


