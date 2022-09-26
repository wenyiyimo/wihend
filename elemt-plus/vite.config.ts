import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// ⭐引入nodejs的模块
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    },
  },
})
