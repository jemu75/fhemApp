import { Ref, JSXComponent, PropType } from 'vue';

interface DateAdapter<T = unknown> {
    date(value?: any): T | null;
    format(date: T, formatString: string): string;
    toJsDate(value: T): Date;
    parseISO(date: string): T;
    toISO(date: T): string;
    startOfDay(date: T): T;
    endOfDay(date: T): T;
    startOfMonth(date: T): T;
    endOfMonth(date: T): T;
    startOfYear(date: T): T;
    endOfYear(date: T): T;
    isBefore(date: T, comparing: T): boolean;
    isAfter(date: T, comparing: T): boolean;
    isEqual(date: T, comparing: T): boolean;
    isSameDay(date: T, comparing: T): boolean;
    isSameMonth(date: T, comparing: T): boolean;
    isValid(date: any): boolean;
    isWithinRange(date: T, range: [T, T]): boolean;
    addDays(date: T, amount: number): T;
    addMonths(date: T, amount: number): T;
    getYear(date: T): number;
    setYear(date: T, year: number): T;
    getDiff(date: T, comparing: T | string, unit?: string): number;
    getWeekArray(date: T): T[][];
    getWeekdays(): string[];
    getMonth(date: T): number;
    setMonth(date: T, month: number): T;
    getNextMonth(date: T): T;
}

interface LocaleMessages {
    [key: string]: LocaleMessages | string;
}
interface LocaleOptions {
    messages?: LocaleMessages;
    locale?: string;
    fallback?: string;
    adapter?: LocaleInstance;
}
interface LocaleInstance {
    name: string;
    messages: Ref<LocaleMessages>;
    current: Ref<string>;
    fallback: Ref<string>;
    t: (key: string, ...params: unknown[]) => string;
    n: (value: number) => string;
    provide: (props: LocaleOptions) => LocaleInstance;
}
interface RtlOptions {
    rtl?: Record<string, boolean>;
}

interface DateInstance<T = DateInstanceType['instanceType']> extends DateAdapter<T> {
    locale?: any;
}
/** Supports module augmentation to specify date object types */
interface DateInstanceType {
    instanceType: unknown;
}
type InternalDateOptions<T = unknown> = {
    adapter: (new (options: {
        locale: any;
        formats?: any;
    }) => DateInstance<T>) | DateInstance<T>;
    formats?: Record<string, any>;
    locale: Record<string, any>;
};
type DateOptions<T = any> = Partial<InternalDateOptions<T>>;

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
type ThemeOptions = false | {
    cspNonce?: string;
    defaultTheme?: string;
    variations?: false | VariationsOptions;
    themes?: Record<string, ThemeDefinition>;
};
type ThemeDefinition = DeepPartial<InternalThemeDefinition>;
interface VariationsOptions {
    colors: string[];
    lighten: number;
    darken: number;
}
interface InternalThemeDefinition {
    dark: boolean;
    colors: Colors;
    variables: Record<string, string | number>;
}
interface Colors extends BaseColors, OnColors {
    [key: string]: string;
}
interface BaseColors {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
}
interface OnColors {
    'on-background': string;
    'on-surface': string;
    'on-primary': string;
    'on-secondary': string;
    'on-success': string;
    'on-warning': string;
    'on-error': string;
    'on-info': string;
}

declare const breakpoints: readonly ["sm", "md", "lg", "xl", "xxl"];
type Breakpoint = typeof breakpoints[number];
type DisplayBreakpoint = 'xs' | Breakpoint;
type DisplayThresholds = {
    [key in DisplayBreakpoint]: number;
};
interface DisplayOptions {
    mobileBreakpoint?: number | DisplayBreakpoint;
    thresholds?: Partial<DisplayThresholds>;
}
type SSROptions = boolean | {
    clientWidth: number;
    clientHeight?: number;
};

type DefaultsInstance = undefined | {
    [key: string]: undefined | Record<string, unknown>;
    global?: Record<string, unknown>;
};
type DefaultsOptions = Partial<DefaultsInstance>;

type IconValue = string | (string | [path: string, opacity: number])[] | JSXComponent;
declare const IconValue: PropType<IconValue>;
interface IconAliases {
    [name: string]: IconValue;
    complete: IconValue;
    cancel: IconValue;
    close: IconValue;
    delete: IconValue;
    clear: IconValue;
    success: IconValue;
    info: IconValue;
    warning: IconValue;
    error: IconValue;
    prev: IconValue;
    next: IconValue;
    checkboxOn: IconValue;
    checkboxOff: IconValue;
    checkboxIndeterminate: IconValue;
    delimiter: IconValue;
    sortAsc: IconValue;
    sortDesc: IconValue;
    expand: IconValue;
    menu: IconValue;
    subgroup: IconValue;
    dropdown: IconValue;
    radioOn: IconValue;
    radioOff: IconValue;
    edit: IconValue;
    ratingEmpty: IconValue;
    ratingFull: IconValue;
    ratingHalf: IconValue;
    loading: IconValue;
    first: IconValue;
    last: IconValue;
    unfold: IconValue;
    file: IconValue;
    plus: IconValue;
    minus: IconValue;
    calendar: IconValue;
}
interface IconProps {
    tag: string;
    icon?: IconValue;
    disabled?: Boolean;
}
type IconComponent = JSXComponent<IconProps>;
interface IconSet {
    component: IconComponent;
}
type IconOptions = {
    defaultSet?: string;
    aliases?: Partial<IconAliases>;
    sets?: Record<string, IconSet>;
};

interface VuetifyOptions {
    aliases?: Record<string, any>;
    blueprint?: Blueprint;
    components?: Record<string, any>;
    date?: DateOptions;
    directives?: Record<string, any>;
    defaults?: DefaultsOptions;
    display?: DisplayOptions;
    theme?: ThemeOptions;
    icons?: IconOptions;
    locale?: LocaleOptions & RtlOptions;
    ssr?: SSROptions;
}
interface Blueprint extends Omit<VuetifyOptions, 'blueprint'> {
}

declare const md2: Blueprint;

export { md2 };
