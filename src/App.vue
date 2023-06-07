<template>
  <drag-section
    @up="upFn"
    :select="arr"
  ></drag-section>
  
  </template>
  <script setup lang="ts">
  import DragSection from '@/views/DragSetcion.vue'
  let arr = reactive(['1_5', '8_16'])
  let upFn = (data) => {
    console.log(data)
  }
  </script>