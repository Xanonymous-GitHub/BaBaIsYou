import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import WindiCSS from 'vite-plugin-windicss'
import Unocss from 'unocss/vite'
import { join } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${join(__dirname, 'src')}`
    }
  },
  plugins: [
    vue({
      isProduction: true
    }),
    Unocss(), // for fun
    WindiCSS(),
    createHtmlPlugin()
  ],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 100000,
    rollupOptions: {
      output: {
        preferConst: true,
        freeze: true,
        manualChunks(id) {
          if (id.includes('core')) {
            return 'core'
          }
        }
      }
    }
  },
  esbuild: {
    include: './src/**/*.{js,ts,jsx,tsx,css,json,text,base64,dataurl,file,binary}'
  }
})
