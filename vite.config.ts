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
    target: 'modules',
    outDir: "dist",
    minify: false,
    rollupOptions: {
      input: ['index.html'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'es',
          preserveModulesRoot: 'src'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'lib',
          preserveModulesRoot: 'src'
        }
      ]
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs'],
    }
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
