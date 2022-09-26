import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        roles?: string[]; // 控制有权访问页面的角色
        requiresAuth: boolean; // 是否需要登录才能访问当前页面（每条路线必须声明）
        icon?: string; // 图标显示在侧菜单中
        locale?: string; // 区域名称显示在侧菜单和面包屑中
        hideInMenu?: boolean; // 如果为真，则不会显示在侧菜单中
        order?: number; // 对路由菜单项进行排序。如果设置键，则值越高，越向前
        noAffix?: boolean; // 如果设置为true，标签将不会粘贴在标签栏中
        ignoreCache?: boolean; // 如果设置为true，则不会缓存页面
    }
}