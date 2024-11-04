<script setup lang="ts">
const bgColorArr = ref(['#f0000990', '#0f000069', '#00f00092', '#d6d3d1', '#f59e0b', '#65a30d'])
</script>

<template>
  <p class="text-center text-2xl">
    元素平滑滚动
  </p>
  <div class="pt-[40px]">
    <div
      v-for="(item, index) in bgColorArr" :key="index" v-sidein
      class="mb-[40px] flex h-[250px]  w-full items-center justify-center text-2xl font-bold text-white" :style="{
        background: item,
      }"
    >
      {{ index }}
    </div>
  </div>
</template>

<style scoped></style>
