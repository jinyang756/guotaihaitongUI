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
      },
      // 确保静态资源被正确处理
      output: {
        // 保留原始文件名，避免缓存问题
        assetFileNames: '[name][extname]',
        chunkFileNames: '[name].js'
      }
    },
    // 确保public目录下的所有文件都被正确复制到dist目录
    assetsDir: '',
    copyPublicDir: true
  },
  // 配置静态资源路径解析
  resolve: {
    alias: {
      '/image.png': '/image.png'
    }
  },
  // 确保public目录下的资源可以正确访问
  publicDir: 'public',
  // 配置服务器设置
  server: {
    // 确保静态文件可以正确加载
    fs: {
      allow: ['.']
    }
  },
  // 配置预览服务器
  preview: {
    // 确保预览服务器也能正确处理静态资源
    port: 4173,
    strictPort: true,
    open: true
  }
})
