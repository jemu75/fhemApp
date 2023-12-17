import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes } from 'vue';

declare const block: readonly ["top", "bottom"];
declare const inline: readonly ["start", "end", "left", "right"];
type Tblock = typeof block[number];
type Tinline = typeof inline[number];
type Anchor = Tblock | Tinline | 'center' | 'center center' | `${Tblock} ${Tinline | 'center'}` | `${Tinline} ${Tblock | 'center'}`;

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

declare const VProgressLinear: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        reverse: boolean;
        max: string | number;
        absolute: boolean;
        location: NonNullable<Anchor>;
        height: string | number;
        active: boolean;
        stream: boolean;
        style: vue.StyleValue;
        tag: string;
        indeterminate: boolean;
        modelValue: string | number;
        bufferValue: string | number;
        clickable: boolean;
        striped: boolean;
        roundedBar: boolean;
    } & {
        color?: string | undefined;
        class?: any;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
        bgOpacity?: string | number | undefined;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: {
                value: number;
                buffer: number;
            }) => vue.VNodeChild) | undefined;
        } | ((arg: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: {
                value: number;
                buffer: number;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'update:modelValue': (value: number) => boolean;
    }, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        reverse: boolean;
        max: string | number;
        absolute: boolean;
        location: NonNullable<Anchor>;
        height: string | number;
        active: boolean;
        stream: boolean;
        style: vue.StyleValue;
        tag: string;
        indeterminate: boolean;
        modelValue: string | number;
        bufferValue: string | number;
        clickable: boolean;
        striped: boolean;
        roundedBar: boolean;
    } & {
        color?: string | undefined;
        class?: any;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
        bgOpacity?: string | number | undefined;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: {
                value: number;
                buffer: number;
            }) => vue.VNodeChild) | undefined;
        } | ((arg: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: {
                value: number;
                buffer: number;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    }, {
        reverse: boolean;
        max: string | number;
        absolute: boolean;
        location: NonNullable<Anchor>;
        height: string | number;
        active: boolean;
        stream: boolean;
        style: vue.StyleValue;
        tag: string;
        indeterminate: boolean;
        rounded: string | number | boolean;
        modelValue: string | number;
        bufferValue: string | number;
        clickable: boolean;
        striped: boolean;
        roundedBar: boolean;
    }, true, {}, vue.SlotsType<Partial<{
        default: (arg: {
            value: number;
            buffer: number;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        reverse: boolean;
        max: string | number;
        absolute: boolean;
        location: NonNullable<Anchor>;
        height: string | number;
        active: boolean;
        stream: boolean;
        style: vue.StyleValue;
        tag: string;
        indeterminate: boolean;
        modelValue: string | number;
        bufferValue: string | number;
        clickable: boolean;
        striped: boolean;
        roundedBar: boolean;
    } & {
        color?: string | undefined;
        class?: any;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
        bgOpacity?: string | number | undefined;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: {
                value: number;
                buffer: number;
            }) => vue.VNodeChild) | undefined;
        } | ((arg: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: {
                value: number;
                buffer: number;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    }, {}, {}, {}, {}, {
        reverse: boolean;
        max: string | number;
        absolute: boolean;
        location: NonNullable<Anchor>;
        height: string | number;
        active: boolean;
        stream: boolean;
        style: vue.StyleValue;
        tag: string;
        indeterminate: boolean;
        rounded: string | number | boolean;
        modelValue: string | number;
        bufferValue: string | number;
        clickable: boolean;
        striped: boolean;
        roundedBar: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    reverse: boolean;
    max: string | number;
    absolute: boolean;
    location: NonNullable<Anchor>;
    height: string | number;
    active: boolean;
    stream: boolean;
    style: vue.StyleValue;
    tag: string;
    indeterminate: boolean;
    modelValue: string | number;
    bufferValue: string | number;
    clickable: boolean;
    striped: boolean;
    roundedBar: boolean;
} & {
    color?: string | undefined;
    class?: any;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    bgColor?: string | undefined;
    bgOpacity?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | {
        default?: ((arg: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    } | ((arg: {
        value: number;
        buffer: number;
    }) => vue.VNodeChild);
    'v-slots'?: {
        default?: false | ((arg: {
            value: number;
            buffer: number;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((arg: {
        value: number;
        buffer: number;
    }) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: number) => boolean;
}, string, {
    reverse: boolean;
    max: string | number;
    absolute: boolean;
    location: NonNullable<Anchor>;
    height: string | number;
    active: boolean;
    stream: boolean;
    style: vue.StyleValue;
    tag: string;
    indeterminate: boolean;
    rounded: string | number | boolean;
    modelValue: string | number;
    bufferValue: string | number;
    clickable: boolean;
    striped: boolean;
    roundedBar: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: (arg: {
        value: number;
        buffer: number;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    location: {
        type: vue.PropType<NonNullable<Anchor>>;
        default: NonNullable<Anchor>;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    absolute: BooleanConstructor;
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    bgColor: StringConstructor;
    bgOpacity: (StringConstructor | NumberConstructor)[];
    bufferValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    clickable: BooleanConstructor;
    color: StringConstructor;
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    indeterminate: BooleanConstructor;
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    reverse: BooleanConstructor;
    stream: BooleanConstructor;
    striped: BooleanConstructor;
    roundedBar: BooleanConstructor;
}, vue.ExtractPropTypes<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    location: {
        type: vue.PropType<NonNullable<Anchor>>;
        default: NonNullable<Anchor>;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    absolute: BooleanConstructor;
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    bgColor: StringConstructor;
    bgOpacity: (StringConstructor | NumberConstructor)[];
    bufferValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    clickable: BooleanConstructor;
    color: StringConstructor;
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    indeterminate: BooleanConstructor;
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    reverse: BooleanConstructor;
    stream: BooleanConstructor;
    striped: BooleanConstructor;
    roundedBar: BooleanConstructor;
}>>;
type VProgressLinear = InstanceType<typeof VProgressLinear>;

export { VProgressLinear };
