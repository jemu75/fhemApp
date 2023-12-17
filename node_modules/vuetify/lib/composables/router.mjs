// Utilities
import { computed, nextTick, onScopeDispose, resolveDynamicComponent, toRef } from 'vue';
import { deepEqual, getCurrentInstance, hasEvent, IN_BROWSER, propsFactory } from "../util/index.mjs"; // Types
export function useRoute() {
  const vm = getCurrentInstance('useRoute');
  return computed(() => vm?.proxy?.$route);
}
export function useRouter() {
  return getCurrentInstance('useRouter')?.proxy?.$router;
}
export function useLink(props, attrs) {
  const RouterLink = resolveDynamicComponent('RouterLink');
  const isLink = computed(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return isLink?.value || hasEvent(attrs, 'click') || hasEvent(props, 'click');
  });
  if (typeof RouterLink === 'string') {
    return {
      isLink,
      isClickable,
      href: toRef(props, 'href')
    };
  }
  const link = props.to ? RouterLink.useLink(props) : undefined;
  const route = useRoute();
  return {
    isLink,
    isClickable,
    route: link?.route,
    navigate: link?.navigate,
    isActive: link && computed(() => {
      if (!props.exact) return link.isActive?.value;
      if (!route.value) return link.isExactActive?.value;
      return link.isExactActive?.value && deepEqual(link.route.value.query, route.value.query);
    }),
    href: computed(() => props.to ? link?.route.value.href : props.href)
  };
}
export const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, 'router');
let inTransition = false;
export function useBackButton(router, cb) {
  let popped = false;
  let removeBefore;
  let removeAfter;
  if (IN_BROWSER) {
    nextTick(() => {
      window.addEventListener('popstate', onPopstate);
      removeBefore = router?.beforeEach((to, from, next) => {
        if (!inTransition) {
          setTimeout(() => popped ? cb(next) : next());
        } else {
          popped ? cb(next) : next();
        }
        inTransition = true;
      });
      removeAfter = router?.afterEach(() => {
        inTransition = false;
      });
    });
    onScopeDispose(() => {
      window.removeEventListener('popstate', onPopstate);
      removeBefore?.();
      removeAfter?.();
    });
  }
  function onPopstate(e) {
    if (e.state?.replaced) return;
    popped = true;
    setTimeout(() => popped = false);
  }
}
//# sourceMappingURL=router.mjs.map