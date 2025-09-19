// https://vitejs.dev/config/
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  // 禁用TypeScript检查
  esbuild: {
    tsconfigRaw: '{}'
  }
})
