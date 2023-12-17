import * as vite from 'vite';
import { PluginOptions } from './types.mjs';
import '@intlify/bundle-utils';

declare const _default: (options: PluginOptions) => vite.Plugin | vite.Plugin[];

export { _default as default };
