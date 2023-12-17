import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, PropType } from 'vue';

type HSV = {
    h: number;
    s: number;
    v: number;
    a?: number;
};

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

type ColorPickerMode = {
    inputProps: Record<string, unknown>;
    inputs: {
        [key: string]: any;
        getValue: (color: any) => number | string;
        getColor: (color: any, v: string) => any;
    }[];
    from: (color: any) => HSV;
    to: (color: HSV) => any;
};
declare const modes: {
    rgb: {
        inputs: {
            [key: string]: any;
            getValue: (color: any) => number | string;
            getColor: (color: any, v: string) => any;
        }[];
        inputProps: Record<string, unknown>;
        from: (color: any) => HSV;
        to: (color: HSV) => any;
    };
    rgba: ColorPickerMode;
    hsl: {
        inputs: {
            [key: string]: any;
            getValue: (color: any) => number | string;
            getColor: (color: any, v: string) => any;
        }[];
        inputProps: Record<string, unknown>;
        from: (color: any) => HSV;
        to: (color: HSV) => any;
    };
    hsla: ColorPickerMode;
    hex: {
        inputs: {
            label: string;
            getValue: (c: string) => string;
            getColor: (c: string, v: string) => string;
        }[];
        inputProps: Record<string, unknown>;
        from: (color: any) => HSV;
        to: (color: HSV) => any;
    };
    hexa: ColorPickerMode;
};

declare const VColorPicker: {
    new (...args: any[]): vue.CreateComponentPublicInstance<Readonly<vue.ExtractPropTypes<{
        width: {
            type: PropType<NonNullable<string | number>>;
            default: NonNullable<string | number>;
        };
        border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        color: StringConstructor;
        position: {
            type: PropType<"fixed" | "absolute" | "static" | "sticky" | "relative">;
            validator: (v: any) => boolean;
        };
        style: {
            type: PropType<vue.StyleValue>;
            default: null;
        };
        class: PropType<any>;
        tag: {
            type: StringConstructor;
            default: string;
        };
        elevation: {
            type: (StringConstructor | NumberConstructor)[];
            validator(v: any): boolean;
        };
        theme: StringConstructor;
        rounded: {
            type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
            default: undefined;
        };
        canvasHeight: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        disabled: BooleanConstructor;
        dotSize: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        hideCanvas: BooleanConstructor;
        hideSliders: BooleanConstructor;
        hideInputs: BooleanConstructor;
        mode: {
            type: PropType<"rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa">;
            default: string;
            validator: (v: string) => boolean;
        };
        modes: {
            type: PropType<readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[]>;
            default: () => string[];
            validator: (v: any) => boolean;
        };
        showSwatches: BooleanConstructor;
        swatches: PropType<readonly (readonly (string | number | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number | undefined;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number | undefined;
        } | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number | undefined;
        })[])[]>;
        swatchesMaxHeight: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        modelValue: {
            type: PropType<string | Record<string, unknown> | null | undefined>;
        };
    }>> & {
        "onUpdate:modelValue"?: ((color: any) => any) | undefined;
        "onUpdate:mode"?: ((mode: "rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa") => any) | undefined;
    }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'update:modelValue': (color: any) => true;
        'update:mode': (mode: keyof typeof modes) => true;
    }, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & Readonly<vue.ExtractPropTypes<{
        width: {
            type: PropType<NonNullable<string | number>>;
            default: NonNullable<string | number>;
        };
        border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        color: StringConstructor;
        position: {
            type: PropType<"fixed" | "absolute" | "static" | "sticky" | "relative">;
            validator: (v: any) => boolean;
        };
        style: {
            type: PropType<vue.StyleValue>;
            default: null;
        };
        class: PropType<any>;
        tag: {
            type: StringConstructor;
            default: string;
        };
        elevation: {
            type: (StringConstructor | NumberConstructor)[];
            validator(v: any): boolean;
        };
        theme: StringConstructor;
        rounded: {
            type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
            default: undefined;
        };
        canvasHeight: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        disabled: BooleanConstructor;
        dotSize: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        hideCanvas: BooleanConstructor;
        hideSliders: BooleanConstructor;
        hideInputs: BooleanConstructor;
        mode: {
            type: PropType<"rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa">;
            default: string;
            validator: (v: string) => boolean;
        };
        modes: {
            type: PropType<readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[]>;
            default: () => string[];
            validator: (v: any) => boolean;
        };
        showSwatches: BooleanConstructor;
        swatches: PropType<readonly (readonly (string | number | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number | undefined;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number | undefined;
        } | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number | undefined;
        })[])[]>;
        swatchesMaxHeight: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        modelValue: {
            type: PropType<string | Record<string, unknown> | null | undefined>;
        };
    }>> & {
        "onUpdate:modelValue"?: ((color: any) => any) | undefined;
        "onUpdate:mode"?: ((mode: "rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa") => any) | undefined;
    }, {
        width: NonNullable<string | number>;
        style: vue.StyleValue;
        disabled: boolean;
        tag: string;
        mode: "rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa";
        rounded: string | number | boolean;
        dotSize: string | number;
        modes: readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[];
        canvasHeight: string | number;
        hideCanvas: boolean;
        hideSliders: boolean;
        hideInputs: boolean;
        showSwatches: boolean;
        swatchesMaxHeight: string | number;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<vue.ExtractPropTypes<{
        width: {
            type: PropType<NonNullable<string | number>>;
            default: NonNullable<string | number>;
        };
        border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        color: StringConstructor;
        position: {
            type: PropType<"fixed" | "absolute" | "static" | "sticky" | "relative">;
            validator: (v: any) => boolean;
        };
        style: {
            type: PropType<vue.StyleValue>;
            default: null;
        };
        class: PropType<any>;
        tag: {
            type: StringConstructor;
            default: string;
        };
        elevation: {
            type: (StringConstructor | NumberConstructor)[];
            validator(v: any): boolean;
        };
        theme: StringConstructor;
        rounded: {
            type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
            default: undefined;
        };
        canvasHeight: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        disabled: BooleanConstructor;
        dotSize: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        hideCanvas: BooleanConstructor;
        hideSliders: BooleanConstructor;
        hideInputs: BooleanConstructor;
        mode: {
            type: PropType<"rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa">;
            default: string;
            validator: (v: string) => boolean;
        };
        modes: {
            type: PropType<readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[]>;
            default: () => string[];
            validator: (v: any) => boolean;
        };
        showSwatches: BooleanConstructor;
        swatches: PropType<readonly (readonly (string | number | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number | undefined;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number | undefined;
        } | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number | undefined;
        })[])[]>;
        swatchesMaxHeight: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        modelValue: {
            type: PropType<string | Record<string, unknown> | null | undefined>;
        };
    }>> & {
        "onUpdate:modelValue"?: ((color: any) => any) | undefined;
        "onUpdate:mode"?: ((mode: "rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa") => any) | undefined;
    }, {}, {}, {}, {}, {
        width: NonNullable<string | number>;
        style: vue.StyleValue;
        disabled: boolean;
        tag: string;
        mode: "rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa";
        rounded: string | number | boolean;
        dotSize: string | number;
        modes: readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[];
        canvasHeight: string | number;
        hideCanvas: boolean;
        hideSliders: boolean;
        hideInputs: boolean;
        showSwatches: boolean;
        swatchesMaxHeight: string | number;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<{
    width: {
        type: PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
    color: StringConstructor;
    position: {
        type: PropType<"fixed" | "absolute" | "static" | "sticky" | "relative">;
        validator: (v: any) => boolean;
    };
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    class: PropType<any>;
    tag: {
        type: StringConstructor;
        default: string;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    canvasHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    disabled: BooleanConstructor;
    dotSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    hideCanvas: BooleanConstructor;
    hideSliders: BooleanConstructor;
    hideInputs: BooleanConstructor;
    mode: {
        type: PropType<"rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa">;
        default: string;
        validator: (v: string) => boolean;
    };
    modes: {
        type: PropType<readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[]>;
        default: () => string[];
        validator: (v: any) => boolean;
    };
    showSwatches: BooleanConstructor;
    swatches: PropType<readonly (readonly (string | number | {
        readonly r: number;
        readonly g: number;
        readonly b: number;
        readonly a?: number | undefined;
    } | {
        readonly h: number;
        readonly s: number;
        readonly v: number;
        readonly a?: number | undefined;
    } | {
        readonly h: number;
        readonly s: number;
        readonly l: number;
        readonly a?: number | undefined;
    })[])[]>;
    swatchesMaxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: PropType<string | Record<string, unknown> | null | undefined>;
    };
}>> & {
    "onUpdate:modelValue"?: ((color: any) => any) | undefined;
    "onUpdate:mode"?: ((mode: "rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa") => any) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (color: any) => true;
    'update:mode': (mode: keyof typeof modes) => true;
}, string, {
    width: NonNullable<string | number>;
    style: vue.StyleValue;
    disabled: boolean;
    tag: string;
    mode: "rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa";
    rounded: string | number | boolean;
    dotSize: string | number;
    modes: readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[];
    canvasHeight: string | number;
    hideCanvas: boolean;
    hideSliders: boolean;
    hideInputs: boolean;
    showSwatches: boolean;
    swatchesMaxHeight: string | number;
}, {}, string, {}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    width: {
        type: PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
    color: StringConstructor;
    position: {
        type: PropType<"fixed" | "absolute" | "static" | "sticky" | "relative">;
        validator: (v: any) => boolean;
    };
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    class: PropType<any>;
    tag: {
        type: StringConstructor;
        default: string;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    canvasHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    disabled: BooleanConstructor;
    dotSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    hideCanvas: BooleanConstructor;
    hideSliders: BooleanConstructor;
    hideInputs: BooleanConstructor;
    mode: {
        type: PropType<"rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa">;
        default: string;
        validator: (v: string) => boolean;
    };
    modes: {
        type: PropType<readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[]>;
        default: () => string[];
        validator: (v: any) => boolean;
    };
    showSwatches: BooleanConstructor;
    swatches: PropType<readonly (readonly (string | number | {
        readonly r: number;
        readonly g: number;
        readonly b: number;
        readonly a?: number | undefined;
    } | {
        readonly h: number;
        readonly s: number;
        readonly v: number;
        readonly a?: number | undefined;
    } | {
        readonly h: number;
        readonly s: number;
        readonly l: number;
        readonly a?: number | undefined;
    })[])[]>;
    swatchesMaxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: PropType<string | Record<string, unknown> | null | undefined>;
    };
}, vue.ExtractPropTypes<{
    width: {
        type: PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    border: (StringConstructor | BooleanConstructor | NumberConstructor)[];
    color: StringConstructor;
    position: {
        type: PropType<"fixed" | "absolute" | "static" | "sticky" | "relative">;
        validator: (v: any) => boolean;
    };
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    class: PropType<any>;
    tag: {
        type: StringConstructor;
        default: string;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    canvasHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    disabled: BooleanConstructor;
    dotSize: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    hideCanvas: BooleanConstructor;
    hideSliders: BooleanConstructor;
    hideInputs: BooleanConstructor;
    mode: {
        type: PropType<"rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa">;
        default: string;
        validator: (v: string) => boolean;
    };
    modes: {
        type: PropType<readonly ("rgb" | "rgba" | "hsl" | "hsla" | "hex" | "hexa")[]>;
        default: () => string[];
        validator: (v: any) => boolean;
    };
    showSwatches: BooleanConstructor;
    swatches: PropType<readonly (readonly (string | number | {
        readonly r: number;
        readonly g: number;
        readonly b: number;
        readonly a?: number | undefined;
    } | {
        readonly h: number;
        readonly s: number;
        readonly v: number;
        readonly a?: number | undefined;
    } | {
        readonly h: number;
        readonly s: number;
        readonly l: number;
        readonly a?: number | undefined;
    })[])[]>;
    swatchesMaxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: {
        type: PropType<string | Record<string, unknown> | null | undefined>;
    };
}>>;
type VColorPicker = InstanceType<typeof VColorPicker>;

export { VColorPicker };
