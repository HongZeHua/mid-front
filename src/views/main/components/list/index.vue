<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinised="isFinised"
      @onLoad="getPexelsData"
    >
      <m-waterfall
        class="w-full px-1"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite>
  </div>
</template>
<script setup>
import { getPexelsList } from '@/api/pexels'
import { ref, watch } from 'vue'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { useStore } from 'vuex'
const store = useStore()
/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20
}
//数据是否在加载中
const loading = ref(false)
//数据是否全部加载完成
const isFinised = ref(false)
//数据源
const pexelsList = ref([])
/**
 * 加载数据的方法
 */
const getPexelsData = async () => {
  //数据全部加载完成，则return
  if (isFinised.value) return
  //完成第一次请求之后，后续请求让page自增
  if (pexelsList.value.length) {
    query.page += 1
  }
  //触发接口请求
  const res = await getPexelsList(query)
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  //判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinised.value = true
  }
  //修改 loading 标记
  loading.value = false
}
getPexelsData()

/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  //重置状态
  isFinised.value = false
  pexelsList.value = []
}

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    //重置请求参数
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)
/**
 * 监听搜索内容项的变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    //重置请求参数
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)
</script>
