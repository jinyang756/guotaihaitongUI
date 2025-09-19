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
  },
  // 配置静态资源路径解析
  resolve: {
    alias: {
      '/image.png': '/image.png'
    }
  },
  // 确保public目录下的资源可以正确访问
  publicDir: 'public'
})
