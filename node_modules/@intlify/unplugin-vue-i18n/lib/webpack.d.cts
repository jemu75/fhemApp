import * as webpack from 'webpack';
import { PluginOptions } from './types.cjs';
import '@intlify/bundle-utils';

declare const _default: (options: PluginOptions) => webpack.WebpackPluginInstance;

export { _default as default };
