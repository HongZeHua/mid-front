//完成 vuex 的初始化
import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import createPersistedState from 'vuex-plugin-persistedstate'

const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    createPersistedState({
      //保存到 localStorage 中的key
      key: 'mid-front',
      //需要保存的模块
      paths: ['category', 'theme']
    })
  ]
})
export default store
