import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
// Styles
import "./VDatePickerMonths.css";

// Components
import { VBtn } from "../VBtn/index.mjs"; // Composables
import { useDate } from "../../composables/date/index.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities
import { computed, watchEffect } from 'vue';
import { convertToUnit, createRange, genericComponent, propsFactory, useRender } from "../../util/index.mjs"; // Types
export const makeVDatePickerMonthsProps = propsFactory({
  color: String,
  height: [String, Number],
  modelValue: Number
}, 'VDatePickerMonths');
export const VDatePickerMonths = genericComponent()({
  name: 'VDatePickerMonths',
  props: makeVDatePickerMonthsProps(),
  emits: {
    'update:modelValue': date => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const adapter = useDate();
    const model = useProxiedModel(props, 'modelValue');
    const months = computed(() => {
      let date = adapter.startOfYear(adapter.date());
      return createRange(12).map(i => {
        const text = adapter.format(date, 'monthShort');
        date = adapter.getNextMonth(date);
        return {
          text,
          value: i
        };
      });
    });
    watchEffect(() => {
      model.value = model.value ?? adapter.getMonth(adapter.date());
    });
    useRender(() => _createVNode("div", {
      "class": "v-date-picker-months",
      "style": {
        height: convertToUnit(props.height)
      }
    }, [_createVNode("div", {
      "class": "v-date-picker-months__content"
    }, [months.value.map((month, i) => {
      const btnProps = {
        active: model.value === i,
        color: model.value === i ? props.color : undefined,
        rounded: true,
        text: month.text,
        variant: model.value === month.value ? 'flat' : 'text',
        onClick: () => onClick(i)
      };
      function onClick(i) {
        model.value = i;
      }
      return slots.month?.({
        month,
        i,
        props: btnProps
      }) ?? _createVNode(VBtn, _mergeProps({
        "key": "month"
      }, btnProps, {
        "onClick": () => onClick(i)
      }), null);
    })])]));
    return {};
  }
});
//# sourceMappingURL=VDatePickerMonths.mjs.map