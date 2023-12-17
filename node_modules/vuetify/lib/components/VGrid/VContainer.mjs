import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VGrid.css";

// Composables
import { makeComponentProps } from "../../composables/component.mjs";
import { useRtl } from "../../composables/locale.mjs";
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities
import { genericComponent, propsFactory, useRender } from "../../util/index.mjs";
export const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VContainer');
export const VContainer = genericComponent()({
  name: 'VContainer',
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    useRender(() => _createVNode(props.tag, {
      "class": ['v-container', {
        'v-container--fluid': props.fluid
      }, rtlClasses.value, props.class],
      "style": props.style
    }, slots));
    return {};
  }
});
//# sourceMappingURL=VContainer.mjs.map