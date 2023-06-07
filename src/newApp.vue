<template>
<drag-section
  @up="upFn"
  :select="arr"
></drag-section>

</template>
<script setup lang="ts">
import DragSection from "../es/packages/index.js";
import  "../es/style.css";
let arr = reactive(['1_5', '8_10'])
let upFn = (data) => {
  console.log(data)
}
</script>