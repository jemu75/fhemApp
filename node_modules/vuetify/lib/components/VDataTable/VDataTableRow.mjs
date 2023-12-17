import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
// Components
import { VBtn } from "../VBtn/index.mjs";
import { VCheckboxBtn } from "../VCheckbox/index.mjs"; // Composables
import { useExpanded } from "./composables/expand.mjs";
import { useHeaders } from "./composables/headers.mjs";
import { useSelection } from "./composables/select.mjs";
import { VDataTableColumn } from "./VDataTableColumn.mjs"; // Utilities
import { toDisplayString, withModifiers } from 'vue';
import { EventProp, genericComponent, getObjectValueByPath, propsFactory, useRender } from "../../util/index.mjs"; // Types
export const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: EventProp(),
  onContextmenu: EventProp(),
  onDblclick: EventProp()
}, 'VDataTableRow');
export const VDataTableRow = genericComponent()({
  name: 'VDataTableRow',
  props: makeVDataTableRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      toggleSelect
    } = useSelection();
    const {
      isExpanded,
      toggleExpand
    } = useExpanded();
    const {
      columns
    } = useHeaders();
    useRender(() => _createVNode("tr", {
      "class": ['v-data-table__tr', {
        'v-data-table__tr--clickable': !!(props.onClick || props.onContextmenu || props.onDblclick)
      }],
      "onClick": props.onClick,
      "onContextmenu": props.onContextmenu,
      "onDblclick": props.onDblclick
    }, [props.item && columns.value.map((column, i) => {
      const item = props.item;
      const slotName = `item.${column.key}`;
      const slotProps = {
        index: props.index,
        item: item.raw,
        internalItem: item,
        value: getObjectValueByPath(item.columns, column.key),
        column,
        isSelected,
        toggleSelect,
        isExpanded,
        toggleExpand
      };
      const cellProps = typeof props.cellProps === 'function' ? props.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value,
        column
      }) : props.cellProps;
      const columnCellProps = typeof column.cellProps === 'function' ? column.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value
      }) : column.cellProps;
      return _createVNode(VDataTableColumn, _mergeProps({
        "align": column.align,
        "fixed": column.fixed,
        "fixedOffset": column.fixedOffset,
        "lastFixed": column.lastFixed,
        "noPadding": column.key === 'data-table-select' || column.key === 'data-table-expand',
        "width": column.width
      }, cellProps, columnCellProps), {
        default: () => {
          if (slots[slotName]) return slots[slotName](slotProps);
          if (column.key === 'data-table-select') {
            return slots['item.data-table-select']?.(slotProps) ?? _createVNode(VCheckboxBtn, {
              "disabled": !item.selectable,
              "modelValue": isSelected([item]),
              "onClick": withModifiers(() => toggleSelect(item), ['stop'])
            }, null);
          }
          if (column.key === 'data-table-expand') {
            return slots['item.data-table-expand']?.(slotProps) ?? _createVNode(VBtn, {
              "icon": isExpanded(item) ? '$collapse' : '$expand',
              "size": "small",
              "variant": "text",
              "onClick": withModifiers(() => toggleExpand(item), ['stop'])
            }, null);
          }
          return toDisplayString(slotProps.value);
        }
      });
    })]));
  }
});
//# sourceMappingURL=VDataTableRow.mjs.map