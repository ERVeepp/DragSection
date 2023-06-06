"use strict";
require("./node_modules/vue/dist/vue.runtime.esm-bundler.js");
const index = require("./components/DragSection/index.vue.js");
const section_data = require("./utils/section_data.js");
const section_data_fn = require("./utils/section_data_fn.js");
const runtimeCore_esmBundler = require("./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js");
const reactivity_esmBundler = require("./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js");
const _sfc_main = /* @__PURE__ */ runtimeCore_esmBundler.defineComponent({
  __name: "App",
  setup(__props) {
    let mySectionData = reactivity_esmBundler.reactive(section_data);
    const mult_timeRange = runtimeCore_esmBundler.computed(() => {
      return mySectionData.map((item) => {
        return {
          id: item.row,
          value: item.value,
          child: section_data_fn.joinling(item.child)
        };
      });
    });
    const mult_timeRange_str = runtimeCore_esmBundler.computed(() => {
      return mult_timeRange.value[0].child;
    });
    const handleMySectionUse = runtimeCore_esmBundler.computed(() => {
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
    let handleMySectionData = runtimeCore_esmBundler.computed(() => {
      return section_data_fn.splicing(mySectionData, []);
    });
    return (_ctx, _cache) => {
      return runtimeCore_esmBundler.openBlock(), runtimeCore_esmBundler.createBlock(index, {
        modelValue: reactivity_esmBundler.unref(mult_timeRange),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => reactivity_esmBundler.isRef(mult_timeRange) ? mult_timeRange.value = $event : null),
        data: reactivity_esmBundler.unref(handleMySectionData).data,
        value: reactivity_esmBundler.unref(handleMySectionUse),
        str: reactivity_esmBundler.unref(mult_timeRange_str)
      }, null, 8, ["modelValue", "data", "value", "str"]);
    };
  }
});
module.exports = _sfc_main;
