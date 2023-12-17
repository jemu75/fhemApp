// Utilities
import { onBeforeUnmount, readonly, ref, watch } from 'vue';
import { refElement } from "../util/index.mjs";
import { IN_BROWSER } from "../util/globals.mjs"; // Types
export function useResizeObserver(callback) {
  let box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'content';
  const resizeRef = ref();
  const contentRect = ref();
  if (IN_BROWSER) {
    const observer = new ResizeObserver(entries => {
      callback?.(entries, observer);
      if (!entries.length) return;
      if (box === 'content') {
        contentRect.value = entries[0].contentRect;
      } else {
        contentRect.value = entries[0].target.getBoundingClientRect();
      }
    });
    onBeforeUnmount(() => {
      observer.disconnect();
    });
    watch(resizeRef, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(refElement(oldValue));
        contentRect.value = undefined;
      }
      if (newValue) observer.observe(refElement(newValue));
    }, {
      flush: 'post'
    });
  }
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}
//# sourceMappingURL=resizeObserver.mjs.map