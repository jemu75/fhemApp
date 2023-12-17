import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
// Styles
import "./VTabs.css";

// Components
import { VTab } from "./VTab.mjs";
import { makeVSlideGroupProps, VSlideGroup } from "../VSlideGroup/VSlideGroup.mjs"; // Composables
import { useBackgroundColor } from "../../composables/color.mjs";
import { provideDefaults } from "../../composables/defaults.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities
import { computed, toRef } from 'vue';
import { convertToUnit, genericComponent, isObject, propsFactory, useRender } from "../../util/index.mjs"; // Types
import { VTabsSymbol } from "./shared.mjs";
function parseItems(items) {
  if (!items) return [];
  return items.map(item => {
    if (!isObject(item)) return {
      text: item,
      value: item
    };
    return item;
  });
}
export const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: 'start'
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: undefined
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...makeVSlideGroupProps({
    mandatory: 'force'
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, 'VTabs');
export const VTabs = genericComponent()({
  name: 'VTabs',
  props: makeVTabsProps(),
  emits: {
    'update:modelValue': v => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const parsedItems = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'bgColor'));
    provideDefaults({
      VTab: {
        color: toRef(props, 'color'),
        direction: toRef(props, 'direction'),
        stacked: toRef(props, 'stacked'),
        fixed: toRef(props, 'fixedTabs'),
        sliderColor: toRef(props, 'sliderColor'),
        hideSlider: toRef(props, 'hideSlider')
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      return _createVNode(VSlideGroup, _mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-tabs', `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          'v-tabs--fixed-tabs': props.fixedTabs,
          'v-tabs--grow': props.grow,
          'v-tabs--stacked': props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          '--v-tabs-height': convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }), {
        default: () => [slots.default ? slots.default() : parsedItems.value.map(item => _createVNode(VTab, _mergeProps(item, {
          "key": item.text
        }), null))]
      });
    });
    return {};
  }
});
//# sourceMappingURL=VTabs.mjs.map