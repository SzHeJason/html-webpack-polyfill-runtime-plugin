## html-webpack-polyfill-runtime-plugin

分析编译后的 js 需要用到的 polyfill 文件，并生成对应的 polyfill.io 服务文件

> 该插件继承于 [html-webpack-plugin@4.x](https://github.com/jantimon/html-webpack-plugin)，要搭配使用

## 安装

```
yarn add html-webpack-polyfill-runtime-plugin
```

### 示例

- [example/webpack4](https://github.com/SzHeJason/html-webpack-polyfill-runtime-plugin/tree/master/examples/webpack4)

polyfill url demo : https://polyfill.io/v3/polyfill.min.js?features=Function.prototype.bind,Map,Object.create,Object.defineProperty,Set,Symbol,Symbol.toStringTag,DataView

### 原理

1. 获取编译后的 js 文件使用到的 features
2. 根据 browserslist 过滤不需要支持的 features
3. 生成 polyfill.io 的链接
4. polyfill.io 服务会自动根据用户浏览器所支持的 features 返回对应的 js 代码

![process](https://user-images.githubusercontent.com/20609396/97774659-c807db80-1b94-11eb-8db6-cad3dc83295e.jpg)

### Build private runtime polyfill service (部署自己的 polyfill 服务)

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
