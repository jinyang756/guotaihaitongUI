// https://vitejs.dev/config/
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  // 使用空的TypeScript配置，避免不必要的TypeScript检查
  esbuild: {
    tsconfigRaw: '{}'
  },
  // 确保Vite正确处理我们的HTML和JavaScript文件
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
