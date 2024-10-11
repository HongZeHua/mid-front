// vite.config.js
import { defineConfig } from "file:///D:/projects/mid-front/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/projects/mid-front/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path, { join } from "path";
import { createSvgIconsPlugin } from "file:///D:/projects/mid-front/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { visualizer } from "file:///D:/projects/mid-front/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "D:\\projects\\mid-front";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      //指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      //指定symbolId格式
      symbolId: "icon-[name]"
    }),
    visualizer({
      emitFile: false,
      file: "stats.html",
      open: false
    })
  ],
  //软链接
  resolve: {
    alias: {
      "@": join(__vite_injected_original_dirname, "/src")
    }
  },
  //代理
  server: {
    proxy: {
      //代理所有/api的请求，该请求将代理到target中
      "/api": {
        //代理请求之后的请求地址
        target: "https://api.imooc-front.lgdsunday.club/",
        //跨域
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0c1xcXFxtaWQtZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RzXFxcXG1pZC1mcm9udFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdHMvbWlkLWZyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGgsIHsgam9pbiB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy9cdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgLy9cdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtuYW1lXSdcbiAgICB9KSxcbiAgICB2aXN1YWxpemVyKHtcbiAgICAgIGVtaXRGaWxlOiBmYWxzZSxcbiAgICAgIGZpbGU6ICdzdGF0cy5odG1sJyxcbiAgICAgIG9wZW46IGZhbHNlXG4gICAgfSlcbiAgXSxcbiAgLy9cdThGNkZcdTk0RkVcdTYzQTVcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGpvaW4oX19kaXJuYW1lLCAnL3NyYycpXG4gICAgfVxuICB9LFxuICAvL1x1NEVFM1x1NzQwNlxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgLy9cdTRFRTNcdTc0MDZcdTYyNDBcdTY3MDkvYXBpXHU3Njg0XHU4QkY3XHU2QzQyXHVGRjBDXHU4QkU1XHU4QkY3XHU2QzQyXHU1QzA2XHU0RUUzXHU3NDA2XHU1MjMwdGFyZ2V0XHU0RTJEXG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgLy9cdTRFRTNcdTc0MDZcdThCRjdcdTZDNDJcdTRFNEJcdTU0MEVcdTc2ODRcdThCRjdcdTZDNDJcdTU3MzBcdTU3NDBcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9hcGkuaW1vb2MtZnJvbnQubGdkc3VuZGF5LmNsdWIvJyxcbiAgICAgICAgLy9cdThERThcdTU3REZcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLG9CQUFvQjtBQUNwUixPQUFPLFNBQVM7QUFDaEIsT0FBTyxRQUFRLFlBQVk7QUFDM0IsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxrQkFBa0I7QUFKM0IsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0oscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssa0NBQVcsTUFBTTtBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVE7QUFBQTtBQUFBLFFBRU4sUUFBUTtBQUFBO0FBQUEsUUFFUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
