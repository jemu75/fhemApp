import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VExpansionPanel.css";

// Composables
import { makeComponentProps } from "../../composables/component.mjs";
import { provideDefaults } from "../../composables/defaults.mjs";
import { makeGroupProps, useGroup } from "../../composables/group.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, provideTheme } from "../../composables/theme.mjs"; // Utilities
import { computed, toRef } from 'vue';
import { genericComponent, propsFactory, useRender } from "../../util/index.mjs"; // Types
export const VExpansionPanelSymbol = Symbol.for('vuetify:v-expansion-panel');
const allowedVariants = ['default', 'accordion', 'inset', 'popout'];
export const makeVExpansionPanelsProps = propsFactory({
  color: String,
  static: Boolean,
  variant: {
    type: String,
    default: 'default',
    validator: v => allowedVariants.includes(v)
  },
  readonly: Boolean,
  ...makeComponentProps(),
  ...makeGroupProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VExpansionPanels');
export const VExpansionPanels = genericComponent()({
  name: 'VExpansionPanels',
  props: makeVExpansionPanelsProps(),
  emits: {
    'update:modelValue': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = provideTheme(props);
    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        color: toRef(props, 'color'),
        readonly: toRef(props, 'readonly'),
        static: toRef(props, 'static')
      }
    });
    useRender(() => _createVNode(props.tag, {
      "class": ['v-expansion-panels', themeClasses.value, variantClass.value, props.class],
      "style": props.style
    }, slots));
    return {};
  }
});
//# sourceMappingURL=VExpansionPanels.mjs.map