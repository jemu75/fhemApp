import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, PropType, JSXComponent } from 'vue';

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

declare const VExpansionPanels: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        variant: "default" | "inset" | "accordion" | "popout";
        style: vue.StyleValue;
        disabled: boolean;
        multiple: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
    } & {
        max?: number | undefined;
        color?: string | undefined;
        class?: any;
        mandatory?: boolean | "force" | undefined;
        theme?: string | undefined;
        modelValue?: any;
        selectedClass?: string | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: unknown) => any) | undefined;
    }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'update:modelValue': (val: unknown) => boolean;
    }, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        variant: "default" | "inset" | "accordion" | "popout";
        style: vue.StyleValue;
        disabled: boolean;
        multiple: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
    } & {
        max?: number | undefined;
        color?: string | undefined;
        class?: any;
        mandatory?: boolean | "force" | undefined;
        theme?: string | undefined;
        modelValue?: any;
        selectedClass?: string | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: unknown) => any) | undefined;
    }, {
        variant: "default" | "inset" | "accordion" | "popout";
        style: vue.StyleValue;
        disabled: boolean;
        multiple: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
        modelValue: any;
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
        variant: "default" | "inset" | "accordion" | "popout";
        style: vue.StyleValue;
        disabled: boolean;
        multiple: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
    } & {
        max?: number | undefined;
        color?: string | undefined;
        class?: any;
        mandatory?: boolean | "force" | undefined;
        theme?: string | undefined;
        modelValue?: any;
        selectedClass?: string | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: unknown) => any) | undefined;
    }, {}, {}, {}, {}, {
        variant: "default" | "inset" | "accordion" | "popout";
        style: vue.StyleValue;
        disabled: boolean;
        multiple: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
        modelValue: any;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    variant: "default" | "inset" | "accordion" | "popout";
    style: vue.StyleValue;
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    static: boolean;
    tag: string;
} & {
    max?: number | undefined;
    color?: string | undefined;
    class?: any;
    mandatory?: boolean | "force" | undefined;
    theme?: string | undefined;
    modelValue?: any;
    selectedClass?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: unknown) => any) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (val: unknown) => boolean;
}, string, {
    variant: "default" | "inset" | "accordion" | "popout";
    style: vue.StyleValue;
    disabled: boolean;
    multiple: boolean;
    readonly: boolean;
    static: boolean;
    tag: string;
    modelValue: any;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: StringConstructor;
    disabled: BooleanConstructor;
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    color: StringConstructor;
    static: BooleanConstructor;
    variant: {
        type: PropType<"default" | "inset" | "accordion" | "popout">;
        default: string;
        validator: (v: any) => boolean;
    };
    readonly: BooleanConstructor;
}, vue.ExtractPropTypes<{
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: null;
        default: undefined;
    };
    multiple: BooleanConstructor;
    mandatory: PropType<boolean | "force">;
    max: NumberConstructor;
    selectedClass: StringConstructor;
    disabled: BooleanConstructor;
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    color: StringConstructor;
    static: BooleanConstructor;
    variant: {
        type: PropType<"default" | "inset" | "accordion" | "popout">;
        default: string;
        validator: (v: any) => boolean;
    };
    readonly: BooleanConstructor;
}>>;
type VExpansionPanels = InstanceType<typeof VExpansionPanels>;

type IconValue = string | (string | [path: string, opacity: number])[] | JSXComponent;
declare const IconValue: PropType<IconValue>;

declare const VExpansionPanel: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    } & {
        color?: string | undefined;
        value?: any;
        title?: string | undefined;
        text?: string | undefined;
        class?: any;
        elevation?: string | number | undefined;
        rounded?: string | number | boolean | undefined;
        selectedClass?: string | undefined;
        bgColor?: string | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            title?: (() => vue.VNodeChild) | undefined;
            text?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            title?: false | (() => vue.VNodeChild) | undefined;
            text?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onGroup:selected"?: ((val: {
            value: boolean;
        }) => any) | undefined;
    }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'group:selected': (val: {
            value: boolean;
        }) => boolean;
    }, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    } & {
        color?: string | undefined;
        value?: any;
        title?: string | undefined;
        text?: string | undefined;
        class?: any;
        elevation?: string | number | undefined;
        rounded?: string | number | boolean | undefined;
        selectedClass?: string | undefined;
        bgColor?: string | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            title?: (() => vue.VNodeChild) | undefined;
            text?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            title?: false | (() => vue.VNodeChild) | undefined;
            text?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onGroup:selected"?: ((val: {
            value: boolean;
        }) => any) | undefined;
    }, {
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
        rounded: string | number | boolean;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    }, true, {}, vue.SlotsType<Partial<{
        default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        title: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        text: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        eager: boolean;
        disabled: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    } & {
        color?: string | undefined;
        value?: any;
        title?: string | undefined;
        text?: string | undefined;
        class?: any;
        elevation?: string | number | undefined;
        rounded?: string | number | boolean | undefined;
        selectedClass?: string | undefined;
        bgColor?: string | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            title?: (() => vue.VNodeChild) | undefined;
            text?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            title?: false | (() => vue.VNodeChild) | undefined;
            text?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        "onGroup:selected"?: ((val: {
            value: boolean;
        }) => any) | undefined;
    }, {}, {}, {}, {}, {
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        readonly: boolean;
        static: boolean;
        tag: string;
        rounded: string | number | boolean;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    style: vue.StyleValue;
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    static: boolean;
    tag: string;
    ripple: boolean | {
        class: string;
    } | undefined;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
} & {
    color?: string | undefined;
    value?: any;
    title?: string | undefined;
    text?: string | undefined;
    class?: any;
    elevation?: string | number | undefined;
    rounded?: string | number | boolean | undefined;
    selectedClass?: string | undefined;
    bgColor?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
        title?: (() => vue.VNodeChild) | undefined;
        text?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        title?: false | (() => vue.VNodeChild) | undefined;
        text?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:title"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:text"?: false | (() => vue.VNodeChild) | undefined;
} & {
    "onGroup:selected"?: ((val: {
        value: boolean;
    }) => any) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'group:selected': (val: {
        value: boolean;
    }) => boolean;
}, string, {
    style: vue.StyleValue;
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    static: boolean;
    tag: string;
    rounded: string | number | boolean;
    ripple: boolean | {
        class: string;
    } | undefined;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    title: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    text: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    color: StringConstructor;
    expandIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    collapseIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    hideActions: BooleanConstructor;
    static: BooleanConstructor;
    ripple: {
        type: vue.PropType<boolean | {
            class: string;
        } | undefined>;
        default: boolean;
    };
    readonly: BooleanConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    eager: BooleanConstructor;
    value: null;
    disabled: BooleanConstructor;
    selectedClass: StringConstructor;
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    title: StringConstructor;
    text: StringConstructor;
    bgColor: StringConstructor;
}, vue.ExtractPropTypes<{
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    color: StringConstructor;
    expandIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    collapseIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    hideActions: BooleanConstructor;
    static: BooleanConstructor;
    ripple: {
        type: vue.PropType<boolean | {
            class: string;
        } | undefined>;
        default: boolean;
    };
    readonly: BooleanConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    eager: BooleanConstructor;
    value: null;
    disabled: BooleanConstructor;
    selectedClass: StringConstructor;
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    title: StringConstructor;
    text: StringConstructor;
    bgColor: StringConstructor;
}>>;
type VExpansionPanel = InstanceType<typeof VExpansionPanel>;

declare const VExpansionPanelText: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        style: vue.StyleValue;
        eager: boolean;
    } & {
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
    }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        style: vue.StyleValue;
        eager: boolean;
    } & {
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
        style: vue.StyleValue;
        eager: boolean;
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
        eager: boolean;
    } & {
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
    }, {}, {}, {}, {}, {
        style: vue.StyleValue;
        eager: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    style: vue.StyleValue;
    eager: boolean;
} & {
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
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    style: vue.StyleValue;
    eager: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    eager: BooleanConstructor;
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
}, vue.ExtractPropTypes<{
    eager: BooleanConstructor;
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
}>>;
type VExpansionPanelText = InstanceType<typeof VExpansionPanelText>;

interface ExpansionPanelTitleSlot {
    collapseIcon: IconValue;
    disabled: boolean | undefined;
    expanded: boolean;
    expandIcon: IconValue;
    readonly: boolean;
}
declare const VExpansionPanelTitle: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        style: vue.StyleValue;
        readonly: boolean;
        static: boolean;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    } & {
        color?: string | undefined;
        class?: any;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
            actions?: ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        } | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
            actions?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        "v-slot:actions"?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
    }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        style: vue.StyleValue;
        readonly: boolean;
        static: boolean;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    } & {
        color?: string | undefined;
        class?: any;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
            actions?: ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        } | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
            actions?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        "v-slot:actions"?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
    }, {
        style: vue.StyleValue;
        readonly: boolean;
        static: boolean;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    }, true, {}, vue.SlotsType<Partial<{
        default: (arg: ExpansionPanelTitleSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        actions: (arg: ExpansionPanelTitleSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        readonly: boolean;
        static: boolean;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    } & {
        color?: string | undefined;
        class?: any;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
            actions?: ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        } | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
            actions?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        "v-slot:actions"?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
    }, {}, {}, {}, {}, {
        style: vue.StyleValue;
        readonly: boolean;
        static: boolean;
        ripple: boolean | {
            class: string;
        } | undefined;
        collapseIcon: IconValue;
        expandIcon: IconValue;
        hideActions: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    style: vue.StyleValue;
    readonly: boolean;
    static: boolean;
    ripple: boolean | {
        class: string;
    } | undefined;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
} & {
    color?: string | undefined;
    class?: any;
} & {
    $children?: vue.VNodeChild | {
        default?: ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        actions?: ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
    } | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild);
    'v-slots'?: {
        default?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
        actions?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
    "v-slot:actions"?: false | ((arg: ExpansionPanelTitleSlot) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    style: vue.StyleValue;
    readonly: boolean;
    static: boolean;
    ripple: boolean | {
        class: string;
    } | undefined;
    collapseIcon: IconValue;
    expandIcon: IconValue;
    hideActions: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: (arg: ExpansionPanelTitleSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    actions: (arg: ExpansionPanelTitleSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    color: StringConstructor;
    expandIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    collapseIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    hideActions: BooleanConstructor;
    static: BooleanConstructor;
    ripple: {
        type: PropType<boolean | {
            class: string;
        } | undefined>;
        default: boolean;
    };
    readonly: BooleanConstructor;
}, vue.ExtractPropTypes<{
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    color: StringConstructor;
    expandIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    collapseIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    hideActions: BooleanConstructor;
    static: BooleanConstructor;
    ripple: {
        type: PropType<boolean | {
            class: string;
        } | undefined>;
        default: boolean;
    };
    readonly: BooleanConstructor;
}>>;
type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>;

export { VExpansionPanel, VExpansionPanelText, VExpansionPanelTitle, VExpansionPanels };
