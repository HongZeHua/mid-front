<template>
  <div class="relative" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹出层的视图 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white border rounded-md"
        :style="contenStyle"
      >
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
//左上
const PROP_TOP_LEFT = 'top-left'
//右上
const PROP_TOP_RIGHT = 'top-right'
//左下
const PROP_BOTTOM_LEFT = 'bottom-left'
//右下
const PROP_BOTTOM_RIGHT = 'bottom-right'
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
//延迟关闭时长
const DELAY_TIME = 100
</script>
<script setup>
/**
 * 1.指定所有可选位置的常量，并生成 enum
 * 2.通过prop控制指定位置
 * 3.获取元素的DOM，创建读取元素尺寸的方法
 * 4.生成气泡的样式对象，用来控制每个位置对应的样式
 * 5.根据prop，计算样式对象
 */
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  //控制气泡弹出位置，并给出开发者错误的提示
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 palcement 必须是 ${placementEnum.join('、')} 中的一个`
        )
      }
      return result
    }
  }
})
const isVisable = ref(false)

let timeout
/**
 * 鼠标移入触发
 */
const onMouseenter = () => {
  isVisable.value = true
  //再次触发时，清理延时装置
  if (timeout) {
    clearTimeout(timeout)
  }
}
/**
 * 鼠标移出触发
 */
const onMouseleave = () => {
  //延时装置
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}
/**
 * 计算元素尺寸
 */
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
/**
 * 计算弹层的位置
 */
const contenStyle = ref({
  top: 0,
  left: 0
})
/**
 * 监听展示时变化，在展示时计算气泡位置
 */
watch(isVisable, (val) => {
  if (!val) return
  nextTick(() => {
    switch (props.placement) {
      //左上
      case PROP_TOP_LEFT:
        contenStyle.value.top = 0
        contenStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      //右上
      case PROP_TOP_RIGHT:
        contenStyle.value.top = 0
        contenStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
      //左下
      case PROP_BOTTOM_LEFT:
        contenStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contenStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      //右下
      case PROP_BOTTOM_RIGHT:
        contenStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contenStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
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
