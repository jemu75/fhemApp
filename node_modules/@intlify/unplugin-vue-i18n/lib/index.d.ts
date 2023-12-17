import * as _unplugin from 'unplugin';
import { PluginOptions } from './types.js';
export { SFCLangFormat } from './types.js';
import '@intlify/bundle-utils';

declare const unplugin: _unplugin.UnpluginInstance<PluginOptions, boolean>;

export { PluginOptions, unplugin as default, unplugin };
