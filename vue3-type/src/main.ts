import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store, { State } from './store/store';
import { http } from './http/http'
// 加载UI库, 引入后组件会被全局注册, 我们在任意组件内都可以直接使用
/*import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'*/
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ArcoVue);
// 组件内可以使用this.$http表示http变量(axios)
app.config.globalProperties.$http = http;


app.mount('#app');
