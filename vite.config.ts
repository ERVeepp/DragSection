import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    //https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts
    AutoImport({
      // resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: true //auto generation auto-imports.d.ts file
    }),
    // auto config of index.html title
    createHtmlPlugin({
      inject: {
        // Inject data into ejs template
        data: {
          title: 'Drag Section'
        }
      }
    })
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // })
  ],
  build: {
    lib: {
      // 注意此处的路径要配置正确
      entry: resolve("packages/index.js"),
      name: "DragSection",
      fileName: (format) => `dragsection.${format}.js`,
    },
    // 自定义构建配置，可直接调整底层Rollup选项；Rollup有一套预设
    // https://rollupjs.org/guide/en/#big-list-of-options
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    //why remove it , look for https://github.com/vitejs/vite/issues/6026
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove()
              }
            }
          }
        }
      ]
    },
    preprocessorOptions: {
      //define global scss variable
      scss: {
        additionalData: `@use "sass:math";@import "@/styles/common.scss";`
      }
    }
  },
});
