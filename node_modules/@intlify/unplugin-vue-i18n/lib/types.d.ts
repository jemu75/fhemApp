import { CodeGenOptions } from '@intlify/bundle-utils';

type SFCLangFormat = 'json' | 'json5' | 'yml' | 'yaml';
interface PluginOptions {
    include?: string | string[];
    onlyLocales?: string | string[];
    allowDynamic?: boolean;
    jitCompilation?: boolean;
    dropMessageCompiler?: boolean;
    runtimeOnly?: boolean;
    compositionOnly?: boolean;
    ssr?: boolean;
    fullInstall?: boolean;
    esm?: boolean;
    forceStringify?: boolean;
    defaultSFCLang?: SFCLangFormat;
    globalSFCScope?: boolean;
    bridge?: boolean;
    legacy?: boolean;
    vueVersion?: CodeGenOptions['vueVersion'];
    useClassComponent?: boolean;
    useVueI18nImportName?: boolean;
    strictMessage?: boolean;
    escapeHtml?: boolean;
}

export type { PluginOptions, SFCLangFormat };
