import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

const resolve = str => path.resolve(__dirname, str)

export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, __dirname)
  const IS_DEV = ENV.VITE_APP_ENV !== 'production'
  return {
    base: './',
    resolve: {
      alias: {
        '@': resolve('src'),
        '@components': resolve('src/components'),
        '@utils': resolve('src/utils'),
        '@views': resolve('src/views'),
        '@assets': resolve('src/assets')
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    build: {
      // 公共路径(必须有的，不然打包css和js路径问题不加载)
      publicPath: './',
      // 打包构建输出路径
      outDir: 'dist',
      // 生成静态资源的存放路径
      assetsDir: 'static',
      // 构建后是否生成 source map 文件
      sourcemap: IS_DEV,
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 700,
      // 生产环境移除 console
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !IS_DEV,
          drop_debugger: !IS_DEV
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vlib: ['vue', 'vue-router', 'vuex']
          }
        }
      }
    },
    server: {
      port: 8088,
      open: true,
      proxy: {
        '/api': 'http://127.0.0.1:3000'
      },
      cors: true
    },
    css: {
      // 处理打包出现警告 "@charset" must be the first
      postcss: {
        plugins: [
          // require('postcss-px-to-viewport-8-plugin')({
          postcsspxtoviewport8plugin({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
            // viewportHeight: 1080,// 视窗的高度，对应的是我们设计稿的高度
            unitPrecision: 6, // 单位转换后保留的精度
            propList: [
              // 能转化为vw的属性列表
              '*'
            ],
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: ['el-switch', 'is-checked'], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。cretae
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/ // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          }),
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    },
    plugins: [
      vue()
    ],
  }
})

