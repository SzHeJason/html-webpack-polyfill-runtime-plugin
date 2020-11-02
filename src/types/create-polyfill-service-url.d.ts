


declare module "create-polyfill-service-url/src/index" {
  const createPolyfillUrl = function (features: string[], supportedBrowsers: string[]) {
    return {
      type: Symbol("url") || Symbol("nothing"),
      message: '',
    }
  }

  createPolyfillUrl.TYPE_URL = Symbol("url")
  createPolyfillUrl.TYPE_URL = Symbol("nothing")

  export default createPolyfillUrl;
}