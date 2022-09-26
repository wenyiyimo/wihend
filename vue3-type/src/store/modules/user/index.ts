import {defineStore} from "pinia";
import {setToken, clearToken} from "@/utils/auth";
import {removeRouteListener} from "@/utils/router-listener";
import {UserState} from "./type";


const userStore = defineStore("user", {
    state: (): UserState => ({
        name: undefined,
        avatar: undefined,
        job: undefined,
        organization: undefined,
        location: undefined,
        email: undefined,
        introduction: undefined,
        personalWebsite: undefined,
        jobName: undefined,
        organizationName: undefined,
        locationName: undefined,
        phone: undefined,
        registrationDate: undefined,
        accountId: undefined,
        certification: undefined,
        role: '',
    }),
    getters: {
        userInfo(state: UserState): UserState {
            return {...state}
        }
    },
    actions: {
        async login(loginForm: any) {
            try {
                setToken('SAJDUABUJBHCBHBAOHD');
            } catch (err) {
                clearToken();
                throw err;
            }
        },
        // Set user's information
        setInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        },
        async info() {
            // const res = await getUserInfo();
            this.setInfo({
                name: 'test',
                role: 'admin'
            });
            window.localStorage.setItem('userRole', 'admin');
        },
        resetInfo() {
            this.$reset();
        },
        // Logout
        async logout() {
            this.resetInfo();
            clearToken();
            removeRouteListener();
        },
    }
})


export default userStore;


