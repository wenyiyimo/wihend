import { extend } from '@vue/shared';
import { createStore } from 'vuex'

// 状态数据
const state = {};

// state的类型
export type State = typeof state


export default createStore<State>({
    state(){
        return state
    },

    getters:{},

    mutations:{},

    actions:{}
})