import { defineComponent, reactive, computed, watch, openBlock, createBlock, unref, isRef } from "vue";
import DragSection from "../components/DragSection/index.vue.js";
import data from "../utils/section_data.js";
import { joinling, splicing } from "../utils/section_data_fn.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DragSetcion",
  props: {
    select: {
      default: () => {
        return [""];
      },
      type: Array
    }
  },
  emits: ["up"],
  setup(__props, { emit }) {
    const props = __props;
    let mySectionData = reactive(data);
    const mult_timeRange = computed(() => {
      return mySectionData.map((item) => {
        return {
          id: item.row,
          value: item.value,
          child: joinling(item.child)
        };
      });
    });
    const mult_timeRange_str = computed(() => {
      return mult_timeRange.value[0].child;
    });
    const handleMySectionUse = computed(() => {
      let select = [];
      mySectionData.map((ele) => {
        ele.child.map((o) => {
          if (o.check) {
            select.push(o.value);
          }
        });
      });
      return select;
    });
    let handleMySectionData = computed(() => {
      return splicing(mySectionData, props.select);
    });
    watch(() => mult_timeRange, (newVal, oldVal) => {
      let data2 = newVal.value[0].child;
      emit("up", data2);
    }, {
      deep: true
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(DragSection, {
        modelValue: unref(mult_timeRange),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(mult_timeRange) ? mult_timeRange.value = $event : null),
        data: unref(handleMySectionData).data,
        value: unref(handleMySectionUse),
        str: unref(mult_timeRange_str)
      }, null, 8, ["modelValue", "data", "value", "str"]);
    };
  }
});
export {
  _sfc_main as default
};
