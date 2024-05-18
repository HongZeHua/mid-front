<template>
  <svg aria-hidden="true">
    <use :class="fillClass" :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  //显示的图标名称
  name: {
    type: String,
    required: true
  },
  //直接指定svg图标的颜色
  color: {
    type: String
  },
  //通过tailwind指定svg颜色的类名
  fillClass: {
    type: String
  }
})
//真实显示的 svg 图标名 （拼接上 #icon）
const symbolId = computed(() => `#icon-${props.name}`)
</script>
