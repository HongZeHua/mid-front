<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-html="highlightText(item)"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>
<script>
const EMIT_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { ref } from 'vue'
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/core'
/**
 * 接收搜索数据
 */
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMIT_ITEM_CLICK])

/**
 * 处理搜索提示的数据获取
 */
const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)
  hintData.value = result
}
/**
 * 监听搜索文本的变化，并获取对应提示数据
 */
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  //每次触发时，延迟的时间
  debounce: 500
})

/**
 * item 点击事件处理
 */
const onItemClick = (item) => {
  emits(EMIT_ITEM_CLICK, item)
}

/**
 * 处理关键字高亮
 */
const highlightText = function (text) {
  //原理：从显示文本中找出与用户输入文本相同的内容，使用高亮标签进行替换
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  //正则表达式
  const reg = new RegExp(props.searchText, 'gi')
  //替换
  return text.replace(reg, highlightStr)
}
</script>
