import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import Unocss from 'unocss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(),
    Unocss(),
    createHtmlPlugin()
  ],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 50000,
    minify: true,
    cssMinify: true,
    sourcemap: false,
    rolldownOptions: {
      onLog(level, log, handler) {
        if (log.code === 'INVALID_ANNOTATION') return
        handler(level, log)
      }
    }
  }
})
