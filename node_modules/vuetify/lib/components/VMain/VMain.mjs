import { createVNode as _createVNode } from "vue";
// Styles
import "./VMain.css";

// Composables
import { makeComponentProps } from "../../composables/component.mjs";
import { useLayout } from "../../composables/layout.mjs";
import { useSsrBoot } from "../../composables/ssrBoot.mjs";
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities
import { genericComponent, propsFactory, useRender } from "../../util/index.mjs";
export const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeTagProps({
    tag: 'main'
  })
}, 'VMain');
export const VMain = genericComponent()({
  name: 'VMain',
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => _createVNode(props.tag, {
      "class": ['v-main', {
        'v-main--scrollable': props.scrollable
      }, props.class],
      "style": [mainStyles.value, ssrBootStyles.value, props.style]
    }, {
      default: () => [props.scrollable ? _createVNode("div", {
        "class": "v-main__scroller"
      }, [slots.default?.()]) : slots.default?.()]
    }));
    return {};
  }
});
//# sourceMappingURL=VMain.mjs.map