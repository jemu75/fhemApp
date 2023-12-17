import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, PropType } from 'vue';

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

declare const VLayout: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        style: vue.StyleValue;
        fullHeight: boolean;
    } & {
        class?: any;
        overlaps?: string[] | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    }, {
        getLayoutItem: (id: string) => {
            size: number;
            position: "left" | "top" | "bottom" | "right";
            top: number;
            bottom: number;
            left: number;
            right: number;
            id: string;
        } | undefined;
        items: vue.ComputedRef<{
            size: number;
            position: "left" | "top" | "bottom" | "right";
            top: number;
            bottom: number;
            left: number;
            right: number;
            id: string;
        }[]>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        style: vue.StyleValue;
        fullHeight: boolean;
    } & {
        class?: any;
        overlaps?: string[] | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    }, {
        style: vue.StyleValue;
        fullHeight: boolean;
    }, true, {}, vue.SlotsType<Partial<{
        default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        style: vue.StyleValue;
        fullHeight: boolean;
    } & {
        class?: any;
        overlaps?: string[] | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    }, {
        getLayoutItem: (id: string) => {
            size: number;
            position: "left" | "top" | "bottom" | "right";
            top: number;
            bottom: number;
            left: number;
            right: number;
            id: string;
        } | undefined;
        items: vue.ComputedRef<{
            size: number;
            position: "left" | "top" | "bottom" | "right";
            top: number;
            bottom: number;
            left: number;
            right: number;
            id: string;
        }[]>;
    }, {}, {}, {}, {
        style: vue.StyleValue;
        fullHeight: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    style: vue.StyleValue;
    fullHeight: boolean;
} & {
    class?: any;
    overlaps?: string[] | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, {
    getLayoutItem: (id: string) => {
        size: number;
        position: "left" | "top" | "bottom" | "right";
        top: number;
        bottom: number;
        left: number;
        right: number;
        id: string;
    } | undefined;
    items: vue.ComputedRef<{
        size: number;
        position: "left" | "top" | "bottom" | "right";
        top: number;
        bottom: number;
        left: number;
        right: number;
        id: string;
    }[]>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    style: vue.StyleValue;
    fullHeight: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    overlaps: vue.Prop<string[]>;
    fullHeight: BooleanConstructor;
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
}, vue.ExtractPropTypes<{
    overlaps: vue.Prop<string[]>;
    fullHeight: BooleanConstructor;
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
}>>;
type VLayout = InstanceType<typeof VLayout>;

declare const VLayoutItem: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        absolute: boolean;
        order: string | number;
        position: "left" | "top" | "bottom" | "right";
        style: vue.StyleValue;
        size: string | number;
        modelValue: boolean;
    } & {
        name?: string | undefined;
        class?: any;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        absolute: boolean;
        order: string | number;
        position: "left" | "top" | "bottom" | "right";
        style: vue.StyleValue;
        size: string | number;
        modelValue: boolean;
    } & {
        name?: string | undefined;
        class?: any;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    }, {
        absolute: boolean;
        order: string | number;
        style: vue.StyleValue;
        size: string | number;
        modelValue: boolean;
    }, true, {}, vue.SlotsType<Partial<{
        default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        absolute: boolean;
        order: string | number;
        position: "left" | "top" | "bottom" | "right";
        style: vue.StyleValue;
        size: string | number;
        modelValue: boolean;
    } & {
        name?: string | undefined;
        class?: any;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    }, () => JSX.Element, {}, {}, {}, {
        absolute: boolean;
        order: string | number;
        style: vue.StyleValue;
        size: string | number;
        modelValue: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    absolute: boolean;
    order: string | number;
    position: "left" | "top" | "bottom" | "right";
    style: vue.StyleValue;
    size: string | number;
    modelValue: boolean;
} & {
    name?: string | undefined;
    class?: any;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    absolute: boolean;
    order: string | number;
    style: vue.StyleValue;
    size: string | number;
    modelValue: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    name: {
        type: StringConstructor;
    };
    order: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    position: {
        type: PropType<"left" | "top" | "bottom" | "right">;
        required: true;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: BooleanConstructor;
}, vue.ExtractPropTypes<{
    name: {
        type: StringConstructor;
    };
    order: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    position: {
        type: PropType<"left" | "top" | "bottom" | "right">;
        required: true;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: BooleanConstructor;
}>>;
type VLayoutItem = InstanceType<typeof VLayoutItem>;

export { VLayout, VLayoutItem };
