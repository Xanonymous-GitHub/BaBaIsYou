import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { minifyHtml } from 'vite-plugin-html'
import legacy from '@vitejs/plugin-legacy'
import WindiCSS from 'vite-plugin-windicss'
import compress from 'vite-plugin-compress'
import { join } from 'path'

const obfuscator = require('rollup-plugin-obfuscator')

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
    WindiCSS(),
    legacy({
      targets: ['defaults', 'dead', '> 1%', 'ie 10', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'ie 11', 'since 2002', 'unreleased versions']
    }),
    minifyHtml({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true
    }),
    compress({
      brotli: false,
      verbose: true
    })
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
      compress: true
    },
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
      },
      plugins: [
        obfuscator({
          globalOptions: {
            log: false,
            selfDefending: true,
            disableConsoleOutput: true,
            stringArray: true,
            stringArrayEncoding: ['rc4'],
            stringArrayIndexShift: true
          }
        })
      ]
    }
  },
  esbuild: {
    include: './src/**/*.{js,ts,jsx,tsx,css,json,text,base64,dataurl,file,binary}'
  }
})