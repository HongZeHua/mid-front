import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //软链接
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  //代理
  server: {
    proxy: {
      //代理所有/api的请求，该请求将代理到target中
      '/api': {
        //代理请求之后的请求地址
        target: 'https://api.imooc-front.lgdsunday.club/',
        //跨域
        changeOrigin: true
      }
    }
  }
})
