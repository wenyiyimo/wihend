import { createRouter, createWebHashHistory } from 'vue-router'

import login from '../views/login.vue';
import from from '../views/from.vue';
import hello from '../views/hello.vue';


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
        },{
            path:'/hello',
            component:hello
        }
    ]
});

export default router
