import { createApp } from 'vue'
import App from './App.vue'
import routerView from './router'
import i18n from './loacle'
import './http/http';
import store from './store';
// 加载UI库, 引入后组件会被全局注册, 我们在任意组件内都可以直接使用
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(routerView);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(i18n);
app.use(store);

app.mount('#app');
