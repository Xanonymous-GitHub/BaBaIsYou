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
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 50000,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].min.js',
        assetFileNames: 'assets/[name]-[hash].min[extname]',
        freeze: true,
        minifyInternalExports: true,
        sourcemap: false,
        strict: true,
        compact: true,
        manualChunks(id) {
          if (id.includes('core')) {
            return 'core'
          }
        }
      }
    }
  },
  esbuild: {
    legalComments: 'none',
    minifySyntax: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    platform: 'browser',
    include: './src/**/*.{js,ts,jsx,tsx,css,json,text,base64,dataurl,file,binary}'
  }
})
