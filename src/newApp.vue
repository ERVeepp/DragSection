<template>
<drag-section
  @up="upFn"
  :select="arr"
></drag-section>

</template>
<script setup lang="ts">
import DragSection from "../dist/dragsection.es.js";
import "../dist/style.css";
let arr = reactive(['1_2'])
let upFn = (data) => {
  console.log(data)
}
</script>