<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
    >
      {{ item }}
    </div>
  </div>
</template>
<script>
const EMIT_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { ref, watch } from 'vue'
import { getHint } from '@/api/pexels'
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
watch(() => props.searchText, getHintData, {
  immediate: true
})

/**
 * item 点击事件处理
 */
const onItemClick = (item) => {
  emits(EMIT_ITEM_CLICK, item)
}
</script>
