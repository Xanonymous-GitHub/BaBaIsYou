import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
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
    Unocss(),
    createHtmlPlugin()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 50000,
    minify: true,
    cssMinify: true,
    sourcemap: false,
  },
  esbuild: {
    legalComments: 'none',
    minify: true,
    minifySyntax: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    platform: 'browser',
    include: './src/**/*.{js,ts,jsx,tsx,css,json,text,base64,dataurl,file,binary}',
  }
})
