import * as vite from 'vite';
import { PluginOptions } from './types.cjs';
import '@intlify/bundle-utils';

declare const _default: (options: PluginOptions) => vite.Plugin | vite.Plugin[];

export { _default as default };
