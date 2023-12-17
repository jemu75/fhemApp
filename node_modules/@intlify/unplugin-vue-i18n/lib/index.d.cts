import * as _unplugin from 'unplugin';
import { PluginOptions } from './types.cjs';
export { SFCLangFormat } from './types.cjs';
import '@intlify/bundle-utils';

declare const unplugin: _unplugin.UnpluginInstance<PluginOptions, boolean>;

export { PluginOptions, unplugin as default, unplugin };
