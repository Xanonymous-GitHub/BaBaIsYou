import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import compress from 'vite-plugin-compress'
import {minifyHtml} from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
    plugins: [
        vue({
            isProduction: true,
        }),
        WindiCSS({
            safelist: 'prose prose-sm m-auto'
        }),
        compress({
            brotli: true,
            verbose: true
        }),
        legacy({
            targets: ['defaults']
        }),
        minifyHtml({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
        }),
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
    },
    esbuild: {
        include: './src/**/*.{js,ts,jsx,tsx,css,json,text,base64,dataurl,file,binary}'
    }
})
