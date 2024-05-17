import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
/**
 * 判断当前是否为移动设备，判断依据是当前屏幕宽度是否小于一个指定值（1280）
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
/**
 * 初始化 rem 基准值
 */
export const useREM = () => {
  //定义最大的 fontSize
  const Max_FONT_SIZE = 40
  //监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    //获取 html 标签
    const html = document.querySelector('html')
    //获取根元素 fontSize 标准，屏幕宽度/10.
    let fontSize = window.innerWidth / 10
    //获取到的 fontSize 不允许超过我们定义的最大值
    fontSize = fontSize > Max_FONT_SIZE ? Max_FONT_SIZE : fontSize
    //定义根元素（html）fontSize 的大小（rem）
    html.style.fontSize = fontSize + 'px'
  })
}
