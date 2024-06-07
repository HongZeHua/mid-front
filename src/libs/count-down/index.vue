<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>

<script>
//倒计时
const EMITS_FINISH = 'finish'
//倒计时改变
const EMITS_CHANGE = 'change'
//倒计时的时间间隔
const INTERVAL_COUNT = 1000
</script>
<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import dayjs from './utils'
const props = defineProps({
  //毫秒
  time: {
    type: Number,
    required: true
  },
  //遵循 dayjs format 标准
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})
const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])
/**
 * 开始倒计时方法
 */
let interval = null
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}
/**
 * 倒计时行为
 */
const duration = ref(0)
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)
  //监听结束行为
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}
/**
 * 结束倒计时方法
 */
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}

/**
 * 开始倒计时
 */
watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  {
    immediate: true
  }
)
/**
 * 处理显示时间
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})

/**
 * 组件销毁时，清理倒计时
 */
onUnmounted(() => {
  close()
})
</script>
