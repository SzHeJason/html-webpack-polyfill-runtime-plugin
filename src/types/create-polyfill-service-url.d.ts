declare module "create-polyfill-service-url/src/index" {
  function createPolyfillUrl(features: string[], supportedBrowsers: string[]) {
    return {
      type: Symbol("url") || Symbol("nothing"),
      message: '',
    }
  }

  createPolyfillUrl.TYPE_URL = Symbol("url")
  createPolyfillUrl.TYPE_URL = Symbol("nothing")

  export default createPolyfillUrl;
}