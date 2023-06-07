"use strict";
const vue = require("vue");
const index = require("../components/DragSection/index.vue.js");
const section_data = require("../utils/section_data.js");
const section_data_fn = require("../utils/section_data_fn.js");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    let mySectionData = vue.reactive(section_data);
    const mult_timeRange = vue.computed(() => {
      return mySectionData.map((item) => {
        return {
          id: item.row,
          value: item.value,
          child: section_data_fn.joinling(item.child)
        };
      });
    });
    const mult_timeRange_str = vue.computed(() => {
      return mult_timeRange.value[0].child;
    });
    const handleMySectionUse = vue.computed(() => {
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
    let handleMySectionData = vue.computed(() => {
      return section_data_fn.splicing(mySectionData, props.select);
    });
    vue.watch(() => mult_timeRange, (newVal, oldVal) => {
      let data = newVal.value[0].child;
      emit("up", data);
    }, {
      deep: true
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(index, {
        modelValue: vue.unref(mult_timeRange),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(mult_timeRange) ? mult_timeRange.value = $event : null),
        data: vue.unref(handleMySectionData).data,
        value: vue.unref(handleMySectionUse),
        str: vue.unref(mult_timeRange_str)
      }, null, 8, ["modelValue", "data", "value", "str"]);
    };
  }
});
module.exports = _sfc_main;
