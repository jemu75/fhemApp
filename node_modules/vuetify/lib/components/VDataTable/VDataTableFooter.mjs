import { createVNode as _createVNode } from "vue";
// Styles
import "./VDataTableFooter.css";

// Components
import { VPagination } from "../VPagination/index.mjs";
import { VSelect } from "../VSelect/index.mjs"; // Composables
import { usePagination } from "./composables/paginate.mjs";
import { useLocale } from "../../composables/locale.mjs"; // Utilities
import { computed } from 'vue';
import { genericComponent, propsFactory, useRender } from "../../util/index.mjs"; // Types
export const makeVDataTableFooterProps = propsFactory({
  prevIcon: {
    type: String,
    default: '$prev'
  },
  nextIcon: {
    type: String,
    default: '$next'
  },
  firstIcon: {
    type: String,
    default: '$first'
  },
  lastIcon: {
    type: String,
    default: '$last'
  },
  itemsPerPageText: {
    type: String,
    default: '$vuetify.dataFooter.itemsPerPageText'
  },
  pageText: {
    type: String,
    default: '$vuetify.dataFooter.pageText'
  },
  firstPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.firstPage'
  },
  prevPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.prevPage'
  },
  nextPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.nextPage'
  },
  lastPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.lastPage'
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: '10'
    }, {
      value: 25,
      title: '25'
    }, {
      value: 50,
      title: '50'
    }, {
      value: 100,
      title: '100'
    }, {
      value: -1,
      title: '$vuetify.dataFooter.itemsPerPageAll'
    }]
  },
  showCurrentPage: Boolean
}, 'VDataTableFooter');
export const VDataTableFooter = genericComponent()({
  name: 'VDataTableFooter',
  props: makeVDataTableFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      page,
      pageCount,
      startIndex,
      stopIndex,
      itemsLength,
      itemsPerPage,
      setItemsPerPage
    } = usePagination();
    const itemsPerPageOptions = computed(() => props.itemsPerPageOptions.map(option => {
      if (typeof option === 'number') {
        return {
          value: option,
          title: option === -1 ? t('$vuetify.dataFooter.itemsPerPageAll') : String(option)
        };
      }
      return {
        ...option,
        title: t(option.title)
      };
    }));
    useRender(() => _createVNode("div", {
      "class": "v-data-table-footer"
    }, [slots.prepend?.(), _createVNode("div", {
      "class": "v-data-table-footer__items-per-page"
    }, [_createVNode("span", null, [t(props.itemsPerPageText)]), _createVNode(VSelect, {
      "items": itemsPerPageOptions.value,
      "modelValue": itemsPerPage.value,
      "onUpdate:modelValue": v => setItemsPerPage(Number(v)),
      "density": "compact",
      "variant": "outlined",
      "hide-details": true
    }, null)]), _createVNode("div", {
      "class": "v-data-table-footer__info"
    }, [_createVNode("div", null, [t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value)])]), _createVNode("div", {
      "class": "v-data-table-footer__pagination"
    }, [_createVNode(VPagination, {
      "modelValue": page.value,
      "onUpdate:modelValue": $event => page.value = $event,
      "density": "comfortable",
      "first-aria-label": props.firstPageLabel,
      "last-aria-label": props.lastPageLabel,
      "length": pageCount.value,
      "next-aria-label": props.nextPageLabel,
      "prev-aria-label": props.prevPageLabel,
      "rounded": true,
      "show-first-last-page": true,
      "total-visible": props.showCurrentPage ? 1 : 0,
      "variant": "plain"
    }, null)])]));
    return {};
  }
});
//# sourceMappingURL=VDataTableFooter.mjs.map