import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, PropType } from 'vue';

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

declare const VOtpInput: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        length: string | number;
        variant: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        type: "number" | "text" | "password";
        error: boolean;
        label: string;
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        focused: boolean;
        focusAll: boolean;
    } & {
        height?: string | number | undefined;
        width?: string | number | undefined;
        color?: string | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        loading?: string | boolean | undefined;
        class?: any;
        placeholder?: string | undefined;
        theme?: string | undefined;
        divider?: string | undefined;
        rounded?: string | number | boolean | undefined;
        modelValue?: string | number | undefined;
        bgColor?: string | undefined;
        baseColor?: string | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            loader?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            loader?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: string) => any) | undefined;
        "onUpdate:focused"?: ((val: boolean) => any) | undefined;
        onFinish?: ((val: string) => any) | undefined;
    }, {
        blur: () => void;
        focus: () => void;
        reset: () => void;
        isFocused: vue.Ref<boolean> & {
            readonly externalValue: boolean;
        };
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        finish: (val: string) => true;
        'update:focused': (val: boolean) => true;
        'update:modelValue': (val: string) => true;
    }, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        length: string | number;
        variant: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        type: "number" | "text" | "password";
        error: boolean;
        label: string;
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        focused: boolean;
        focusAll: boolean;
    } & {
        height?: string | number | undefined;
        width?: string | number | undefined;
        color?: string | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        loading?: string | boolean | undefined;
        class?: any;
        placeholder?: string | undefined;
        theme?: string | undefined;
        divider?: string | undefined;
        rounded?: string | number | boolean | undefined;
        modelValue?: string | number | undefined;
        bgColor?: string | undefined;
        baseColor?: string | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            loader?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            loader?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: string) => any) | undefined;
        "onUpdate:focused"?: ((val: boolean) => any) | undefined;
        onFinish?: ((val: string) => any) | undefined;
    }, {
        length: string | number;
        variant: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        type: "number" | "text" | "password";
        error: boolean;
        label: string;
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        rounded: string | number | boolean;
        modelValue: string | number;
        focused: boolean;
        focusAll: boolean;
    }, true, {}, vue.SlotsType<Partial<{
        default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        loader: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }>>, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, {
        length: string | number;
        variant: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        type: "number" | "text" | "password";
        error: boolean;
        label: string;
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        focused: boolean;
        focusAll: boolean;
    } & {
        height?: string | number | undefined;
        width?: string | number | undefined;
        color?: string | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        loading?: string | boolean | undefined;
        class?: any;
        placeholder?: string | undefined;
        theme?: string | undefined;
        divider?: string | undefined;
        rounded?: string | number | boolean | undefined;
        modelValue?: string | number | undefined;
        bgColor?: string | undefined;
        baseColor?: string | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            loader?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            loader?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: string) => any) | undefined;
        "onUpdate:focused"?: ((val: boolean) => any) | undefined;
        onFinish?: ((val: string) => any) | undefined;
    }, {
        blur: () => void;
        focus: () => void;
        reset: () => void;
        isFocused: vue.Ref<boolean> & {
            readonly externalValue: boolean;
        };
    }, {}, {}, {}, {
        length: string | number;
        variant: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        type: "number" | "text" | "password";
        error: boolean;
        label: string;
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        rounded: string | number | boolean;
        modelValue: string | number;
        focused: boolean;
        focusAll: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    length: string | number;
    variant: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
    type: "number" | "text" | "password";
    error: boolean;
    label: string;
    style: vue.StyleValue;
    autofocus: boolean;
    disabled: boolean;
    focused: boolean;
    focusAll: boolean;
} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    loading?: string | boolean | undefined;
    class?: any;
    placeholder?: string | undefined;
    theme?: string | undefined;
    divider?: string | undefined;
    rounded?: string | number | boolean | undefined;
    modelValue?: string | number | undefined;
    bgColor?: string | undefined;
    baseColor?: string | undefined;
    'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
        loader?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        loader?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
    "onUpdate:focused"?: ((val: boolean) => any) | undefined;
    onFinish?: ((val: string) => any) | undefined;
}, {
    blur: () => void;
    focus: () => void;
    reset: () => void;
    isFocused: vue.Ref<boolean> & {
        readonly externalValue: boolean;
    };
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    finish: (val: string) => true;
    'update:focused': (val: boolean) => true;
    'update:modelValue': (val: string) => true;
}, string, {
    length: string | number;
    variant: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
    type: "number" | "text" | "password";
    error: boolean;
    label: string;
    style: vue.StyleValue;
    autofocus: boolean;
    disabled: boolean;
    rounded: string | number | boolean;
    modelValue: string | number;
    focused: boolean;
    focusAll: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loader: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    variant: Omit<{
        type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        default: string;
        validator: (v: any) => boolean;
    }, "type" | "default"> & {
        type: PropType<NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">>;
        default: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
    };
    error: BooleanConstructor;
    color: StringConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    class: PropType<any>;
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    bgColor: StringConstructor;
    baseColor: StringConstructor;
    focused: BooleanConstructor;
    'onUpdate:focused': PropType<(args_0: boolean) => void>;
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    autofocus: BooleanConstructor;
    divider: StringConstructor;
    focusAll: BooleanConstructor;
    label: {
        type: StringConstructor;
        default: string;
    };
    length: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    placeholder: StringConstructor;
    type: {
        type: PropType<"number" | "text" | "password">;
        default: string;
    };
}, vue.ExtractPropTypes<{
    variant: Omit<{
        type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        default: string;
        validator: (v: any) => boolean;
    }, "type" | "default"> & {
        type: PropType<NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">>;
        default: NonNullable<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
    };
    error: BooleanConstructor;
    color: StringConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    class: PropType<any>;
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    bgColor: StringConstructor;
    baseColor: StringConstructor;
    focused: BooleanConstructor;
    'onUpdate:focused': PropType<(args_0: boolean) => void>;
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    autofocus: BooleanConstructor;
    divider: StringConstructor;
    focusAll: BooleanConstructor;
    label: {
        type: StringConstructor;
        default: string;
    };
    length: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    placeholder: StringConstructor;
    type: {
        type: PropType<"number" | "text" | "password">;
        default: string;
    };
}>>;
type VOtpInput = InstanceType<typeof VOtpInput>;

export { VOtpInput };
