import "./node_modules/vue/dist/vue.runtime.esm-bundler.js";
import DragSection from "./components/DragSection/index.vue.js";
import data from "./utils/section_data.js";
import { joinling, splicing } from "./utils/section_data_fn.js";
import { defineComponent, computed, openBlock, createBlock } from "./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { reactive, unref, isRef } from "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
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
      return splicing(mySectionData, []);
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
