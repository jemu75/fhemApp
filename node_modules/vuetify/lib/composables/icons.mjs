import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
// Icons
import { aliases, mdi } from "../iconsets/mdi.mjs"; // Utilities
import { computed, inject, unref } from 'vue';
import { defineComponent, genericComponent, mergeDeep, propsFactory } from "../util/index.mjs"; // Types
export const IconValue = [String, Function, Object, Array];
export const IconSymbol = Symbol.for('vuetify:icons');
export const makeIconProps = propsFactory({
  icon: {
    type: IconValue
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true
  }
}, 'icon');
export const VComponentIcon = genericComponent()({
  name: 'VComponentIcon',
  props: makeIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      const Icon = props.icon;
      return _createVNode(props.tag, null, {
        default: () => [props.icon ? _createVNode(Icon, null, null) : slots.default?.()]
      });
    };
  }
});
export const VSvgIcon = defineComponent({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: makeIconProps(),
  setup(props, _ref2) {
    let {
      attrs
    } = _ref2;
    return () => {
      return _createVNode(props.tag, _mergeProps(attrs, {
        "style": null
      }), {
        default: () => [_createVNode("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [Array.isArray(props.icon) ? props.icon.map(path => Array.isArray(path) ? _createVNode("path", {
          "d": path[0],
          "fill-opacity": path[1]
        }, null) : _createVNode("path", {
          "d": path
        }, null)) : _createVNode("path", {
          "d": props.icon
        }, null)])]
      });
    };
  }
});
export const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',
  props: makeIconProps(),
  setup(props) {
    return () => {
      return _createVNode(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }
});
export const VClassIcon = defineComponent({
  name: 'VClassIcon',
  props: makeIconProps(),
  setup(props) {
    return () => {
      return _createVNode(props.tag, {
        "class": props.icon
      }, null);
    };
  }
});
export const defaultSets = {
  svg: {
    component: VSvgIcon
  },
  class: {
    component: VClassIcon
  }
};

// Composables
export function createIcons(options) {
  return mergeDeep({
    defaultSet: 'mdi',
    sets: {
      ...defaultSets,
      mdi
    },
    aliases: {
      ...aliases,
      /* eslint-disable max-len */
      vuetify: ['M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z', ['M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z', 0.6]],
      'vuetify-outline': 'svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z'
      /* eslint-enable max-len */
    }
  }, options);
}
export const useIcon = props => {
  const icons = inject(IconSymbol);
  if (!icons) throw new Error('Missing Vuetify Icons provide!');
  const iconData = computed(() => {
    const iconAlias = unref(props);
    if (!iconAlias) return {
      component: VComponentIcon
    };
    let icon = iconAlias;
    if (typeof icon === 'string') {
      icon = icon.trim();
      if (icon.startsWith('$')) {
        icon = icons.aliases?.[icon.slice(1)];
      }
    }
    if (!icon) throw new Error(`Could not find aliased icon "${iconAlias}"`);
    if (Array.isArray(icon)) {
      return {
        component: VSvgIcon,
        icon
      };
    } else if (typeof icon !== 'string') {
      return {
        component: VComponentIcon,
        icon
      };
    }
    const iconSetName = Object.keys(icons.sets).find(setName => typeof icon === 'string' && icon.startsWith(`${setName}:`));
    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
    return {
      component: iconSet.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};
//# sourceMappingURL=icons.mjs.map