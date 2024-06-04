<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" alt="" />
    <m-button
      class="mt-4 w-[80%] xl:w-1/2"
      :isActiveAnim="false"
      :loading="loading"
      @click="onConfirmClick"
      >确定</m-button
    >
  </div>
</template>
<script>
const EMITS_CLOSE = 'close'
//移动端配置对象
const mobileOptions = {
  //将裁剪框限制为画布的大小
  viewMode: 1,
  //移动画布，裁剪框不动
  dragMode: 'move',
  //裁剪框固定纵横比为1:1
  aspectRatio: 1,
  //裁剪框不可移动
  cropBoxMovable: false,
  //不可调整裁剪框大小
  cropBoxResizeable: false
}
//pc端配置对象
const pcOptions = {
  //裁剪框固定纵横比为1:1
  aspectRatio: 1
}
</script>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import { onMounted, ref } from 'vue'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMITS_CLOSE])
const loading = ref(false)
/**
 * 关闭事件
 */
const close = () => {
  emits(EMITS_CLOSE)
}
/**
 * 图片裁剪处理
 */
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
  /**
   * 接收两个参数：
   * 1.需要裁剪的图片的DOM
   * 2.options 配置对象
   */
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})
/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
  //开启loading
  loading.value = true
  //获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    //裁剪后的blob地址
    console.log(URL.createObjectURL(blob))
  })
}
</script>
