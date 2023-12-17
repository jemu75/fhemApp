import * as _unplugin from 'unplugin';
import { PluginOptions } from './types.mjs';
export { SFCLangFormat } from './types.mjs';
import '@intlify/bundle-utils';

declare const unplugin: _unplugin.UnpluginInstance<PluginOptions, boolean>;

export { PluginOptions, unplugin as default, unplugin };
