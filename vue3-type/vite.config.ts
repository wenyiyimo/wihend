import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 增加对less的配置
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    }
  }
})
