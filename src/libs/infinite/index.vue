<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据了 -->
      <p v-if="isFinised" class="text-center text-base text-zinc-400">
        已经没有更多数据了！
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  //是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  //数据是否全部加载完成
  isFinised: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

//处理 loading 状态
const loading = useVModel(props)

//滚动的元素
const loadingTarget = ref(null)
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], observerElement) => {
    //当加载更多的视图可见时，加载更多数据
    if (isIntersecting && !loading.value && !props.isFinised) {
      console.log('onLoad')
      //修改加载数据标记
      loading.value = true
      //触发加载更多行为
      emits('onLoad')
    }
  }
)
</script>
