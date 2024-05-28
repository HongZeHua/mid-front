import { ALL_CATEGORY_ITEM } from '@/constants'
export default {
  namespaced: true,
  state: () => {
    return {
      //当前选中的状态
      currentCategory: ALL_CATEGORY_ITEM
    }
  },
  mutations: {
    /**
     * 切换选中的分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    }
  }
}
