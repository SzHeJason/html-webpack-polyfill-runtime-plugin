## html-webpack-polyfill-runtime-plugin

运行时自动根据用户浏览器返回文件使用到的 polyfill

> 该插件扩展了 [html-webpack-plugin@4.x](https://github.com/jantimon/html-webpack-plugin)，要搭配使用

## 安装

```
yarn add html-webpack-polyfill-runtime-plugin
```

### 示例

- [example/webpack4](https://github.com/SzHeJason/html-webpack-polyfill-runtime-plugin/tree/master/examples/webpack4)

### 流程

![process](https://sola.gtimg.cn/aoi/sola/20201030153049_BtJnp5lUae.jpg)



### 部署自己的 polyfill 服务

该插件使用了 [polyfill.io](https://polyfill.io/v3/) 提供的服务，如果开发者有需求想自己建立服务，可以使用 [js-polyfill-docker](https://github.com/3YOURMIND/js-polyfill-docker) 构建镜像，然后在插件提供的参数修改 url 地址

```js
// webpack.config.js
const HtmlPolyfillRuntimePlugin = require('html-webpack-polyfill-runtime-plugin')

module.exports = function() {
	...,
	plugins:[
		// 必须放在其他的 html-webpack 插件下
		new HtmlPolyfillRuntimePlugin({
			url(features){
				return `https//yourpolyfill.service.com/pathname?features=${features.join(,)}`
			}
		})
	]
	...,
}
```

