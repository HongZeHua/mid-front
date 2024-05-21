<template>
  <div class="relative" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <div>
      <!-- 具名插槽：触发弹出层的视图 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white border rounded-md"
      >
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const isVisable = ref(false)
/**
 * 鼠标移入触发
 */
const onMouseenter = () => {
  isVisable.value = true
}
/**
 * 鼠标移出触发
 */
const onMouseleave = () => {
  isVisable.value = false
}
</script>
<style lang="scss" scoped>
/* slide 展示动画 */
.slide-enter-active,
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
