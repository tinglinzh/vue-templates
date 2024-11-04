import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components/'],
      // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
      extensions: ['vue'],
      // 生成components.d.ts
      dts: true,
      // 遍历子目录
      deep: true,
    }),
    AutoImport({
      // 自动导入vue相关的Api
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        /* 自定义 */
        {
          /* 自定义模块 */
          api: [['default', 'api']],
          hooks: [['default', 'hooks']],
          store: [['default', 'store']],
        },
      ],
      // 生成auto-import.d.ts声明文件
      dts: 'src/auto-import.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 配置 @ 指向 src 目录
    },
  },
})
