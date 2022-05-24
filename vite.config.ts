import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: './src/types/auto-import.d.ts'
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
