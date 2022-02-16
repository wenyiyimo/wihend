import { createRouter, createWebHashHistory } from 'vue-router'

import login from '../views/login.vue';
import from from '../views/from.vue';


const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'/from',
            component:from
        }
    ]
});

export default router