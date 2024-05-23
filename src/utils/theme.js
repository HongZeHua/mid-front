import { watch } from 'vue'
import store from '@/store'
import { THEME_LIGHT, THEME_DARK } from '@/constants'
/**
 * 初始化主题
 */
export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      //当主题发生改变时，或者当进入系统时，可以进行 html class 的配置
      let themeClassName = ''
      switch (val) {
        case THEME_LIGHT:
          themeClassName = 'light'
          break
        case THEME_DARK:
          themeClassName = 'dark'
          break
      }
      //修改 html 的 class
      document.querySelector('html').className = themeClassName
    },
    {
      //初始执行一次
      immediate: true
    }
  )
}
