import { createApp } from 'vue'
import App from './App.vue'
import 'tailwindcss/tailwind.css'
import router from './router'
import store from './store'
import mLibs from './libs'
//注册 svg-icons
import 'virtual:svg-icons-register'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
useREM()
//初始化主题
useTheme()
createApp(App).use(router).use(store).use(mLibs).mount('#app')
