/**
 * user 模块
 */
import { loginUser, getProfile, registerUser } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs'
export default {
  namespaced: true,
  state: () => ({
    //登录之后的token
    token: '',
    //获取用户信息
    userInfo: {}
  }),
  mutations: {
    /**
     * 保存token
     */
    setToken(state, newToken) {
      state.token = newToken
    },
    /**
     * 保存用户信息
     */
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    }
  },
  actions: {
    /**
     * 注册
     */
    async register(context, payload) {
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    },
    /**
     * 登录
     */
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      context.commit('setToken', data.token)
      //登录成功之后，触发 profile
      context.dispatch('profile')
    },
    /**
     * 获取用户信息
     */
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? `尊贵的 VIP ` + data.vipLevel + `用户 ` + data.nickname
            : data.nickname
        }`,
        5000
      )
    },
    /**
     * 退出登录
     */
    logout(context) {
      //清空 token
      context.commit('setToken', '')
      //清空用户信息
      context.commit('setUserInfo', {})
      //退出登录后，需重新刷新页面，因为对于前台项目而言，用户是否登录看到的数据可能不同
      location.reload()
    }
  }
}
