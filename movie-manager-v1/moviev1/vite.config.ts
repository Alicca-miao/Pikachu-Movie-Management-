import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,

    // 是否开启 https

    // 让开发服务器帮我们做代理
    proxy: {
      // http://localhost:5173/api
      "/api": {
        target: "http://localhost:3000", //API服务地址
        changeOrigin: true, //开启跨域
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/images": {
        target: "http://localhost:3000", //API服务地址
        changeOrigin: true, //开启跨域
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})

