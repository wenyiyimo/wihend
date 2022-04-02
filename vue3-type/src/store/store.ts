import {extend} from '@vue/shared';
import {createStore} from 'vuex'

// 状态数据
const state = {
    userInfo: {
        // 用户名
        userName: '',
        // 头像
        avatar: ''
    },
    //客户端标志
    clientIdent: 'ios_iPhone',
    //存储加密的密钥privateKey
    privateKey: '',
    //登陆后的token，用于附加到请求的地址中
    token: '',
    //token过时时间，在过期时间前自动刷新token
    tokenExpires: 0,
    //用户登陆状态
    userIsLogin: false
};

// state的类型
export type State = typeof state


export default createStore<State>({
    state() {
        return state
    },

    getters: {},

    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },

    actions: {}
})
