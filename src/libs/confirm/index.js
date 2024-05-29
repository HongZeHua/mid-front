/**
 *
 * @param {*} title 标题
 * @param {*} content 文本
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 */
import confirmComponent from './index.vue'
import { h, render } from 'vue'
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    //允许只传递 content
    if (title && !content) {
      content = title
      title = ''
    }
    //关闭弹窗事件
    const close = () => {
      //3.把渲染的 vnode 去掉
      render(null, document.body)
    }
    //取消按钮事件
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'))
    }
    //确定按钮事件
    const confirmHandler = () => {
      resolve()
    }
    //1. 生成vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })
    //2.利用render函数渲染
    render(vnode, document.body)
  })
}
