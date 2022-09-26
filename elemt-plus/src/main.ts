import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import {toLine} from "./utils";

const app = createApp(App)

//全局注册图标 牺牲性能 el-icon-xxx
for (const key in Icons) {
    console.log(`el-icon-${toLine(key)}`)
    app.component(`el-icon-${toLine(key)}`, (Icons as any)[key])
}

app.use(router).use(ElementPlus)
app.mount('#app')
