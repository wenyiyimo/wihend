import {createRouter, createWebHashHistory} from 'vue-router'

import DefaultLayout from '@/layout/default-layout.vue';
import appRoutes from './routes';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routerView = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            name: 'root',
            path: '/',
            component: DefaultLayout,
            children: appRoutes,
        },
    ]
});

createRouteGuard(routerView);

export default routerView
