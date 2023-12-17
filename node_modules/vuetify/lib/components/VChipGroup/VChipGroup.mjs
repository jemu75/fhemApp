import { createVNode as _createVNode } from "vue";
// Styles
import "./VChipGroup.css";

// Composables
import { makeComponentProps } from "../../composables/component.mjs";
import { provideDefaults } from "../../composables/defaults.mjs";
import { makeGroupProps, useGroup } from "../../composables/group.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, provideTheme } from "../../composables/theme.mjs";
import { makeVariantProps } from "../../composables/variant.mjs"; // Utilities
import { toRef } from 'vue';
import { deepEqual, genericComponent, propsFactory, useRender } from "../../util/index.mjs"; // Types
export const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group');
export const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: 'v-chip--selected'
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'tonal'
  })
}, 'VChipGroup');
export const VChipGroup = genericComponent()({
  name: 'VChipGroup',
  props: makeVChipGroupProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
        filter: toRef(props, 'filter'),
        variant: toRef(props, 'variant')
      }
    });
    useRender(() => _createVNode(props.tag, {
      "class": ['v-chip-group', {
        'v-chip-group--column': props.column
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => [slots.default?.({
        isSelected,
        select,
        next,
        prev,
        selected: selected.value
      })]
    }));
    return {};
  }
});
//# sourceMappingURL=VChipGroup.mjs.map