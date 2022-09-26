export default {
    path: 'table',
    name: 'table',
    component: () => import('@/views/table/index.vue'),
    meta: {
        locale: 'menu.table',
        requiresAuth: true,
        icon: 'icon-nav',
        roles: ['admin'],
        order: 1,
    }
}

