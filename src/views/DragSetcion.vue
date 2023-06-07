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

