<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图片 -->
    <header-vue></header-vue>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        注册账号
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onRegHandler">
        <!-- 用户名 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="regForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        ></vee-error-message>
        <!-- 密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="regForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <!-- 确认密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          type="password"
          name="confirmPassword"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="regForm.confirmPassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
        ></vee-error-message>
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToLogin"
            >去登录</a
          >
        </div>
        <div class="text-center mb-2">
          <a
            class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
            href=""
          >
            注册即同意《注册协议》
          </a>
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnim="false"
          :loading="loading"
          >注册</m-button
        >
      </vee-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register'
}
</script>

<script setup>
import headerVue from '../components/header.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate.js'
import { ref } from 'vue'
import { LOGIN_TYPE_USERNAME } from '@/constants/index.js'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()
/**
 * 插入规则
 * 参数：规则的名字，规则函数
 */
defineRule('validateConfirmPassword', validateConfirmPassword)
/**
 * 数据源
 */
const regForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
/**
 * loading
 */
const loading = ref(false)
/**
 * 注册
 */
const onRegHandler = () => {
  loading.value = true
  try {
    //构建对象
    const payload = {
      username: regForm.value.username,
      password: regForm.value.password
    }
    //触发注册
    store.dispatch('user/register', { ...payload, ...route.query })
    //注册成功，触发登录
    store.dispatch('user/login', {
      ...payload,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}

/**
 * 去登录
 */
const onToLogin = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
</script>
