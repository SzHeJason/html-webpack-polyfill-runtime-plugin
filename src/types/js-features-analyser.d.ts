declare module "@financial-times/js-features-analyser/src/index" {
  const pluginTarget: string | Record<string,unknown> | ((...args: any[]) => any);
  export default pluginTarget;
}