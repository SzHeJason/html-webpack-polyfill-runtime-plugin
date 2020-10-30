import { Compiler } from 'webpack';
export interface PluginOptions {
    browserslist?: string | ReadonlyArray<string>;
    /**
     * 自定义 url
     * @tip 返回 undefined 代表使用 polyfil.io 的 url
     */
    url?: (features: string[], featureMap: Record<string, string[]>) => string | undefined;
}
export interface JsAssets {
    source: () => string;
}
export declare class HtmlWebpackPolyfillRunTimePlugin {
    options: PluginOptions;
    constructor(options?: PluginOptions);
    apply(compiler: Compiler): void;
}
