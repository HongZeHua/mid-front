import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index.js'
export { message } from './message/index.js'
export default {
  install(app) {
    //1.获取当前路径任意文件夹下的index.vue文件
    const components = import.meta.glob('./*/index.vue')
    //2.遍历获取到的组件模块
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      //3.通过 app.component 进行注册
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
