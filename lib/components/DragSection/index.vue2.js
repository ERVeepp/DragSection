"use strict";
const vue = require("vue");
const _withScopeId = (n) => (vue.pushScopeId("data-v-c0ebf1bb"), n = n(), vue.popScopeId(), n);
const _hoisted_1 = { class: "c-weektime" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "c-schedue" }, null, -1));
const _hoisted_3 = { class: "c-weektime-head" };
const _hoisted_4 = { class: "c-weektime-body" };
const _hoisted_5 = ["data-week", "data-time", "onMouseenter", "onMousedown", "onMouseup"];
const _hoisted_6 = ["colspan"];
const _hoisted_7 = { class: "c-weektime-con flex jc-between w100" };
const _hoisted_8 = { class: "g-pull-left" };
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "index",
  props: {
    value: {
      default: () => {
        return [];
      },
      type: Array
    },
    data: {
      default: () => {
        return [];
      },
      type: Array
    },
    colspan: {
      type: Number,
      default: () => {
        return 2;
      }
    },
    str: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  setup(__props) {
    const props = __props;
    const len = vue.ref(24);
    const createArr = (len2) => {
      return Array.from(Array(len2)).map((ret, id) => id + 0);
    };
    const state = vue.reactive({
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      mode: 0,
      row: 0,
      col: 0,
      theadArr: [],
      data: vue.toRaw(props.data),
      colspan: vue.toRaw(props.data)
    });
    const styleValue = vue.computed(() => {
      return {
        width: `${state.width}px`,
        height: `${state.height}px`,
        left: `${state.left}px`,
        top: `${state.top}px`
      };
    });
    vue.computed(() => {
      return props.value;
    });
    const selectState = vue.computed(() => {
      return props.value.some((ret) => ret);
    });
    const selectClasses = vue.computed(() => {
      return (n) => n.check ? "ui-selected" : "";
    });
    const cellEnter = (item) => {
      const ele = document.querySelector(`td[data-week='${item.row}'][data-time='${item.col}']`);
      if (ele && !state.mode) {
        state.left = ele.offsetLeft;
        state.top = ele.offsetTop;
      } else {
        if (item.col <= state.col && item.row <= state.row) {
          state.width = (state.col - item.col + 1) * ele.offsetWidth;
          state.height = (state.row - item.row + 1) * ele.offsetHeight;
          state.left = ele.offsetLeft;
          state.top = ele.offsetTop;
        } else if (item.col >= state.col && item.row >= state.row) {
          state.width = (item.col - state.col + 1) * ele.offsetWidth;
          state.height = (item.row - state.row + 1) * ele.offsetHeight;
          if (item.col > state.col && item.row === state.row)
            state.top = ele.offsetTop;
          if (item.col === state.col && item.row > state.row)
            state.left = ele.offsetLeft;
        } else if (item.col > state.col && item.row < state.row) {
          state.width = (item.col - state.col + 1) * ele.offsetWidth;
          state.height = (state.row - item.row + 1) * ele.offsetHeight;
          state.top = ele.offsetTop;
        } else if (item.col < state.col && item.row > state.row) {
          state.width = (state.col - item.col + 1) * ele.offsetWidth;
          state.height = (item.row - state.row + 1) * ele.offsetHeight;
          state.left = ele.offsetLeft;
        }
      }
    };
    const selectWeek = (row, col, check) => {
      const [minRow, maxRow] = row;
      const [minCol, maxCol] = col;
      state.data.forEach((item) => {
        item.child.forEach((t) => {
          if (t.row >= minRow && t.row <= maxRow && t.col >= minCol && t.col <= maxCol) {
            t["check"] = check;
          }
        });
      });
    };
    const clearWeektime = () => {
      state.data.forEach((item) => {
        item.child.forEach((t) => {
          t["check"] = false;
        });
      });
    };
    const cellDown = (item) => {
      const ele = document.querySelector(`td[data-week='${item.row}'][data-time='${item.col}']`);
      state.check = Boolean(item.check);
      state.mode = 1;
      if (ele) {
        state.width = ele.offsetWidth;
        state.height = ele.offsetHeight;
      }
      state.row = item.row;
      state.col = item.col;
    };
    const cellUp = (item) => {
      if (item.col <= state.col && item.row <= state.row) {
        selectWeek([item.row, state.row], [item.col, state.col], !state.check);
      } else if (item.col >= state.col && item.row >= state.row) {
        selectWeek([state.row, item.row], [state.col, item.col], !state.check);
      } else if (item.col > state.col && item.row < state.row) {
        selectWeek([item.row, state.row], [state.col, item.col], !state.check);
      } else if (item.col < state.col && item.row > state.row) {
        selectWeek([state.row, item.row], [item.col, state.col], !state.check);
      }
      state.width = 0;
      state.height = 0;
      state.mode = 0;
    };
    const handleTheadArr = vue.computed(() => {
      return state.theadArr.map((ele) => {
        return ele;
      });
    });
    vue.onMounted(() => {
      state.theadArr = createArr(len.value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        _hoisted_2,
        vue.createElementVNode("div", {
          class: vue.normalizeClass({ "c-schedue": true, "c-schedue-notransi": vue.unref(state).mode }),
          style: vue.normalizeStyle(vue.unref(styleValue))
        }, null, 6),
        vue.createElementVNode("table", {
          class: vue.normalizeClass(["c-weektime-table", { "c-min-table": __props.colspan < 2 }])
        }, [
          vue.createElementVNode("thead", _hoisted_3, [
            vue.createElementVNode("tr", null, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(handleTheadArr), (t) => {
                return vue.openBlock(), vue.createElementBlock("td", {
                  class: "weektime-atom-item-top",
                  key: t
                }, vue.toDisplayString(t), 1);
              }), 128))
            ])
          ]),
          vue.createElementVNode("tbody", _hoisted_4, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(state).data, (t) => {
              return vue.openBlock(), vue.createElementBlock("tr", {
                key: t.row
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(t.child, (n) => {
                  return vue.openBlock(), vue.createElementBlock("td", {
                    key: `${n.row}-${n.col}`,
                    "data-week": n.row,
                    "data-time": n.col,
                    onMouseenter: ($event) => cellEnter(n),
                    onMousedown: ($event) => cellDown(n),
                    onMouseup: ($event) => cellUp(n),
                    class: vue.normalizeClass([vue.unref(selectClasses)(n), "weektime-atom-item"])
                  }, null, 42, _hoisted_5);
                }), 128))
              ]);
            }), 128)),
            vue.createElementVNode("tr", null, [
              vue.createElementVNode("td", {
                colspan: vue.unref(len),
                class: "c-weektime-preview"
              }, [
                vue.createElementVNode("div", _hoisted_7, [
                  vue.createElementVNode("span", _hoisted_8, vue.toDisplayString(vue.unref(selectState) ? "已选择间段: " + props.str : "可拖动鼠标选择间段"), 1),
                  vue.createElementVNode("a", {
                    class: "g-pull-right",
                    onClick: clearWeektime
                  }, "清空选择")
                ])
              ], 8, _hoisted_6)
            ])
          ])
        ], 2)
      ]);
    };
  }
});
module.exports = _sfc_main;