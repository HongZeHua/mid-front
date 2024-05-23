import { ALL_CATEGORY_ITEM, CATEGORY_DEFAULT_DATA } from '@/constants'
import { getCategory } from '@/api/category'

/**
 * 处理 navigationBar 中的数据 categorys
 */
export default {
  //标记独立作用域
  namespaced: true,
  state: () => {
    /**
     * 解决 navigationBar 闪烁问题
     * 1.让 categorys 具备一个初始化数据
     * 2.从服务端获取数据替换初始化数据
     * 3.为了防止初始化数据太老，我们把每次获取到的新数据，都作为下一次的初始化数据=>每次从接口得到的数据，进行缓存（localStorage）。在下次运行时，把缓存的数据作为初始值
     */
    return {
      categorys: CATEGORY_DEFAULT_DATA
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
