// Composables
import { useLocale } from "../../../composables/index.mjs";
import { useProxiedModel } from "../../../composables/proxiedModel.mjs"; // Utilities
import { computed, inject, provide, toRef } from 'vue';
import { getObjectValueByPath, isEmpty, propsFactory } from "../../../util/index.mjs"; // Types
export const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, 'DataTable-sort');
const VDataTableSortSymbol = Symbol.for('vuetify:data-table-sort');
export function createSort(props) {
  const sortBy = useProxiedModel(props, 'sortBy');
  const mustSort = toRef(props, 'mustSort');
  const multiSort = toRef(props, 'multiSort');
  return {
    sortBy,
    mustSort,
    multiSort
  };
}
export function provideSort(options) {
  const {
    sortBy,
    mustSort,
    multiSort,
    page
  } = options;
  const toggleSort = column => {
    if (column.key == null) return;
    let newSortBy = sortBy.value.map(x => ({
      ...x
    })) ?? [];
    const item = newSortBy.find(x => x.key === column.key);
    if (!item) {
      if (multiSort.value) newSortBy = [...newSortBy, {
        key: column.key,
        order: 'asc'
      }];else newSortBy = [{
        key: column.key,
        order: 'asc'
      }];
    } else if (item.order === 'desc') {
      if (mustSort.value) {
        item.order = 'asc';
      } else {
        newSortBy = newSortBy.filter(x => x.key !== column.key);
      }
    } else {
      item.order = 'desc';
    }
    sortBy.value = newSortBy;
    if (page) page.value = 1;
  };
  function isSorted(column) {
    return !!sortBy.value.find(item => item.key === column.key);
  }
  const data = {
    sortBy,
    toggleSort,
    isSorted
  };
  provide(VDataTableSortSymbol, data);
  return data;
}
export function useSort() {
  const data = inject(VDataTableSortSymbol);
  if (!data) throw new Error('Missing sort!');
  return data;
}
export function useSortedItems(props, items, sortBy, sortFunctions) {
  const locale = useLocale();
  const sortedItems = computed(() => {
    if (!sortBy.value.length) return items.value;
    return sortItems(items.value, sortBy.value, locale.current.value, {
      ...props.customKeySort,
      ...sortFunctions?.value
    });
  });
  return {
    sortedItems
  };
}
export function sortItems(items, sortByItems, locale, customSorters) {
  const stringCollator = new Intl.Collator(locale, {
    sensitivity: 'accent',
    usage: 'sort'
  });
  return [...items].sort((a, b) => {
    for (let i = 0; i < sortByItems.length; i++) {
      const sortKey = sortByItems[i].key;
      const sortOrder = sortByItems[i].order ?? 'asc';
      if (sortOrder === false) continue;
      let sortA = getObjectValueByPath(a.raw, sortKey);
      let sortB = getObjectValueByPath(b.raw, sortKey);
      if (sortOrder === 'desc') {
        [sortA, sortB] = [sortB, sortA];
      }
      if (customSorters?.[sortKey]) {
        const customResult = customSorters[sortKey](sortA, sortB);
        if (!customResult) continue;
        return customResult;
      }

      // Dates should be compared numerically
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime();
      }
      [sortA, sortB] = [sortA, sortB].map(s => s != null ? s.toString().toLocaleLowerCase() : s);
      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0;
        if (isEmpty(sortA)) return -1;
        if (isEmpty(sortB)) return 1;
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return stringCollator.compare(sortA, sortB);
      }
    }
    return 0;
  });
}
//# sourceMappingURL=sort.mjs.map