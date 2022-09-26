import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import index from "../views/index.vue";
import icon from "../views/choiceIcon.vue";


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: import("../components/navbar/index.vue"),
        children: [
            {
                path: "/",
                component: index,
            },{
                path: "/icon",
                component: icon,
            }
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default  router
