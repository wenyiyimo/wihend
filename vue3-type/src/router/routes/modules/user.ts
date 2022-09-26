export default {
    path: 'index',
    name: 'index',
    component: () => import('@/views/index/index.vue'),
    meta: {
        locale: 'menu.home',
        requiresAuth: true,
        icon: 'icon-dashboard',
        roles: ['*'],
        order: 0,
    },
};
