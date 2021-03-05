import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    minify: 'terser',
    brotliSize: true,
    cssCodeSplit: true,
    terserOptions: {
      sourceMap: false,
      ecma: 5,
      ie8: true,
      safari10: true,
      keep_classnames: false,
      keep_fnames: false,
      compress: true,
    }
  }
})
