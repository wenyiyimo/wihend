import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
/*vite-plugin-style-import插件用来自动加载组件样式 按需引入*/
import {createStyleImportPlugin} from "vite-plugin-style-import"
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
// __dirname 是node常量，表示当前文件所在的目录
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        /*createStyleImportPlugin({
            libs: [
                {
                    libraryName: '@arco-design/web-vue',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `@arco-design/web-vue/es/${name}/style/css.js`
                        return `@arco-design/web-vue/es/${name}/style/index.js`
                    },
                }
            ]
        })*/
    ],
    // ⭐定义别名
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, './src'),
            }
        ]
    },
})
