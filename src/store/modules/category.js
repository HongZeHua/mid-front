import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'

/**
 * 处理 navigationBar 中的数据 categorys
 */
export default {
  //标记独立作用域
  namespaced: true,
  state: () => {
    return {
      categorys: [ALL_CATEGORY_ITEM]
    }
  },
  mutations: {
    /**
     * 为 categorys 赋值
     */
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  /**
   * 触发一个动作，来完成一整套的 categors 赋值
   */
  actions: {
    /**
     * 获取 categorys 数据，并自动保存到 vuex 中
     */
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
