<template>
<drag-section
  @up="upFn"
  :select="arr"
></drag-section>

</template>
<script setup lang="ts">
import DragSection from "dragsection";
import "dragsection/dist/style.css";
let arr = reactive(['1_5', '8_10'])
let upFn = (data) => {
  console.log(data)
}
</script>