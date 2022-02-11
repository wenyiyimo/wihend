import { createRouter, createWebHashHistory } from 'vue-router'

import login from './views/login.vue';

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/login',
            component:login
        }
    ]
});

export default router