<template>
  <drag-section
    v-model="mult_timeRange"
    :data="handleMySectionData.data"
    :value="handleMySectionUse"
    :str="mult_timeRange_str"
  >
  </drag-section>
</template>

<script setup lang="ts">
import DragSection from '@/components/DragSection/index.vue'
import sectionData from '@/utils/section_data'
import { splicing, joinling } from '@/utils/section_data_fn'
const emit = defineEmits(['up'])
const props = defineProps({
  select: {
    default: () => {
      return ['']
    },
    type: Array
  }
})

let mySectionData = reactive(sectionData)
const mult_timeRange = computed(() => {
  return mySectionData.map(item => {
    return {
      id: item.row,
      value: item.value,
      child: joinling(item.child)
    }
  })
})

const mult_timeRange_str = computed(() => {
  return mult_timeRange.value[0].child
})

const handleMySectionUse = computed(() => {
  let select: any = []
  mySectionData.map(ele => {
    ele.child.map(o => {
      if (o.check) {
        select.push(o.value)
      }
    })
  })
  return select
})

let handleMySectionData = computed(() => {
  return splicing(mySectionData, props.select)
})

watch(() => mult_timeRange, (newVal, oldVal) => {
  let data = newVal.value[0].child
  emit('up', data)
}, {
  deep: true
})

</script>
<style lang="scss">
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
</style>

