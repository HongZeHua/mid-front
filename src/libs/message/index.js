import { h, render } from 'vue'
import messageComponent from './index.vue'
/**
 * @param {*} type  类型：success warn error
 * @param {*} content 描述文本
 * @param {*} duration 展示时间（毫秒），默认 3000
 */
export const message = (type, content, duration = 3000) => {
  /**
   * 动画结束时的回调
   */
  const onDestory = () => {
    //3.message 销毁
    render(null, document.body)
  }
  //1.生成 vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destory: onDestory
  })
  //2.render渲染
  render(vnode, document.body)
}
