import { extend } from '@vue/shared';
import { createStore } from 'vuex'

// 状态数据
const state = {
    userInfo:{
        // 用户名
        userName: '',
        // 头像
        avatar: '',
    },
    userIsLogin:false
};

// state的类型
export type State = typeof state


export default createStore<State>({
    state(){
        return state
    },

    getters:{},

    mutations:{
        setUserInfo(state, userInfo) {
          state.userInfo = userInfo;
        }
    },

    actions:{}
})