import { createApp } from 'vue'
import App from './App.vue'
import 'tailwindcss/tailwind.css'
import router from './router'
import mLibs from './libs'
import 'virtual:svg-icons-register'
import { useREM } from './utils/flexible'
useREM()
createApp(App).use(router).use(mLibs).mount('#app')
