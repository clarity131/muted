import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: './src/types/auto-import.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'css'
      })],
      dts: './src/types/components.d.ts'
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: './src' },
    ]
  },
  build: {
    cssCodeSplit: false,
    minify: 'terser'
  },
  define: {
    __VUE_OPTIONS_API__: false // optimize Vue Options API
  }
})
