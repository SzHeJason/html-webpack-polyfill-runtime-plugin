import { Compiler } from 'webpack';
import { PluginOptions } from './interface';
declare class HtmlWebpackPolyfillRunTimePlugin {
    options: PluginOptions;
    constructor(options?: PluginOptions);
    apply(compiler: Compiler): void;
}
export = HtmlWebpackPolyfillRunTimePlugin;
