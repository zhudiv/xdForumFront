import { defineConfig, loadEnv } from 'vite'
import alias from './vite/alias'
import { parseEnv } from './vite/util'
import setupPlugins from './vite/plugins'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ command, mode }) => {
  const isBuild = command == 'build'
  const env = parseEnv(loadEnv(mode, process.cwd()))

  return {
    plugins: [...setupPlugins(isBuild, env), visualizer()],
    //静态文件 url 前缀
    base: isBuild ? '/dist/' : '/',
    resolve: {
      alias,
    },
    build: {
      //编译文件生成目录
      outDir: '../public/dist/',
      rollupOptions: {
        emptyOutDir: true,
        external: ['lodash', 'lodash-es', 'axios'],
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.split('/node_modules/').pop()?.split('/')[0]
            }
          },

          // manualChunks(id) {
          //   console.log("----------------------++++++++-------------")
          //   console.dir(id)
          //   if (id.includes('node_modules')) {
          //     const arr = id.toString().split('node_modules/')[1].split('/')
          //     switch(arr[0]) {
          //       case '@vue':
          //       case 'element-plus': // UI 库
          //       case '@element-plus': // 图标
          //         return '_' + arr[0]
          //         break
          //       default :
          //         return '__vendor'
          //         break
          //     }
          //   }
          // },
          // chunkFileNames: 'static/js1/[name]-[hash].js',
          // entryFileNames: 'static/js2/[name]-[hash].js',
          // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
        brotliSize: false, // 不统计
        target: 'esnext',
        minify: 'esbuild' // 混淆器，terser构建后文件体积更小
      },
    },
    server: {
      proxy: {
        '/api': {
          // target: env.VITE_MOCK_ENABLE ? '/' : env.VITE_API_URL,
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
        '/captcha/api/math': {
          target: env.VITE_MOCK_ENABLE ? '/' : env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  }
})
