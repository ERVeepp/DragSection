<template>
  <div class="c-weektime">
    <div class="c-schedue"></div>
    <div :class="{'c-schedue': true, 'c-schedue-notransi': state.mode}" :style="styleValue"></div>

    <table class="c-weektime-table" :class="{'c-min-table': colspan < 2}">
      <thead class="c-weektime-head">
        <tr>
          <td class="weektime-atom-item-top" v-for="t in handleTheadArr" :key="t">{{t}}</td>
        </tr>
      </thead>
      <tbody class="c-weektime-body">
        <tr v-for="t in state.data" :key="t.row">
          <td
            v-for="n in t.child"
            :key="`${n.row}-${n.col}`"
            :data-week="n.row"
            :data-time="n.col"
            @mouseenter="cellEnter(n)"
            @mousedown="cellDown(n)"
            @mouseup="cellUp(n)"
            :class="selectClasses(n)"
            class="weektime-atom-item">
          </td>
        </tr>
        <tr>
          <td :colspan="len" class="c-weektime-preview">
            <div class="c-weektime-con flex jc-between w100">
              <span class="g-pull-left">{{selectState ? '已选择间段: ' + props.str : '可拖动鼠标选择间段'}}</span>
              <!-- <a class="g-pull-right" @click.prevent="$emit('on-clear')">清空选择</a> -->
              <a class="g-pull-right" @click="clearWeektime">清空选择</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup name="newCutOff">
const len = ref(24)
const createArr = len => {
  return Array.from(Array(len)).map((ret, id) => (id + 0))
}

const props = defineProps({
  value: {
    default: () => {
      return []
    },
    type: Array
  },
  data: {
    default: () => {
      return []
    },
    type: Array
  },
  colspan: {
    type: Number,
    default: () => {
      return 2
    },
  },
  str: {
    type: String,
    default: () => {
      return ''
    },
  }
})

const state: any = reactive({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  mode: 0,
  row: 0,
  col: 0,
  theadArr: [],
  data: toRaw(props.data),
  colspan: toRaw(props.data),
})

const styleValue = computed(() => {
  return {
    width: `${state.width}px`,
    height: `${state.height}px`,
    left: `${state.left}px`,
    top: `${state.top}px`
  }
})

const selectValue = computed(() => {
  return props.value
})

const selectState = computed(() => {
  return props.value.some(ret => ret)
})

const selectClasses = computed(() => {
  return n => n.check ? 'ui-selected' : ''
})

const cellEnter = (item) => {
  const ele: any = document.querySelector(`td[data-week='${item.row}'][data-time='${item.col}']`)
  if (ele && !state.mode) {
    state.left = ele.offsetLeft
    state.top = ele.offsetTop
  } else {
    if (item.col <= state.col && item.row <= state.row) {
      state.width = (state.col - item.col + 1) * ele.offsetWidth
      state.height = (state.row - item.row + 1) * ele.offsetHeight
      state.left = ele.offsetLeft
      state.top = ele.offsetTop
    } else if (item.col >= state.col && item.row >= state.row) {
      state.width = (item.col - state.col + 1) * ele.offsetWidth
      state.height = (item.row - state.row + 1) * ele.offsetHeight
      if (item.col > state.col && item.row === state.row) state.top = ele.offsetTop
      if (item.col === state.col && item.row > state.row) state.left = ele.offsetLeft
    } else if (item.col > state.col && item.row < state.row) {
      state.width = (item.col - state.col + 1) * ele.offsetWidth
      state.height = (state.row - item.row + 1) * ele.offsetHeight
      state.top = ele.offsetTop
    } else if (item.col < state.col && item.row > state.row) {
      state.width = (state.col - item.col + 1) * ele.offsetWidth
      state.height = (item.row - state.row + 1) * ele.offsetHeight
      state.left = ele.offsetLeft
    }
  }
}

const selectWeek = (row, col, check) => {
  const [minRow, maxRow] = row
  const [minCol, maxCol] = col
  state.data.forEach(item => {
    item.child.forEach(t => {
      if (t.row >= minRow && t.row <= maxRow && t.col >= minCol && t.col <= maxCol) {
        t['check'] = check
      }
    })
  })
}

const clearWeektime = () => {
  state.data.forEach(item => {
    item.child.forEach(t => {
      t['check'] = false
    })
  })
}

const cellDown = (item) => {
  const ele: any = document.querySelector(`td[data-week='${item.row}'][data-time='${item.col}']`)
  state.check = Boolean(item.check)
  state.mode = 1
  if (ele) {
    state.width = ele.offsetWidth
    state.height = ele.offsetHeight
  }

  state.row = item.row
  state.col = item.col
}

const cellUp = (item) => {
  if (item.col <= state.col && item.row <= state.row) {
    selectWeek([item.row, state.row], [item.col, state.col], !state.check)
  } else if (item.col >= state.col && item.row >= state.row) {
    selectWeek([state.row, item.row], [state.col, item.col], !state.check)
  } else if (item.col > state.col && item.row < state.row) {
    selectWeek([item.row, state.row], [state.col, item.col], !state.check)
  } else if (item.col < state.col && item.row > state.row) {
    selectWeek([state.row, item.row], [item.col, state.col], !state.check)
  }
  // 重置鼠标坐标
  state.width = 0
  state.height = 0
  state.mode = 0
}

const handleTheadArr = computed(() => {
  return state.theadArr.map(ele => {
    return ele
  })
})

onMounted(() => {
  state.theadArr = createArr(len.value)
})

</script>
<style lang="scss" scoped>

$boxWidth: math.div(1, 24)* 100%;

.c-weektime {
  min-width: 100%;
  position: relative;
  display: inline-block;
}
.c-schedue {
  background: #598fe6;
  position: absolute;
  width: 0;
  height: 0;
  opacity: .6;
  pointer-events: none;
}
.c-schedue-notransi {
  transition: width .12s ease, height .12s ease, top .12s ease, left .12s ease;
}
.c-weektime-table {
  width: 100%;
  border-collapse: collapse;
  th {
    vertical-align: inherit;
    font-weight: bold;
  }
  tr {
    height: 16px;
    border: 0 !important;
  }
  tr, td, th {
    user-select: none;
    border: 1px solid #dee4f5;
    text-align: center;
    min-width: 12px;
    height: 18px;
    width: $boxWidth;
    line-height: 12px;
    transition: background .2s ease;
  }
  .weektime-atom-item-top{
    width: $boxWidth;
  }
  .c-weektime-head {
    font-size: 12px;
    .week-td {
      width: $boxWidth;
    }
  }
  .c-weektime-body {
    font-size: 12px;
    td {
      &.weektime-atom-item {
        user-select: unset;
        background-color: #f5f5f5;
      }
      &.ui-selected {
        background-color: #409EFF;
      }
    }
  }
  .c-weektime-preview {
    line-height: 2.4em;
    padding: 10px;
    font-size: 14px;
    .c-weektime-con {
      line-height: 46px;
      user-select: none;
    }
    .c-weektime-time {
      text-align: left;
      line-height: 2.4em;
      p {
        max-width: 625px;
        line-height: 1.4em;
        word-break: break-all;
        margin-bottom: 8px;
      }
    }
  }
}
.c-min-table {
  tr, td, th {
    min-width: 24px;
  }
}
.g-clearfix {
  &:after, &:before {
    clear: both;
    content: " ";
    display: table;
  }
}
.g-pull-left {
  float: left;
}
.g-pull-right {
  float: right;
}
.g-tip-text {
  color: #999;
}
</style>
