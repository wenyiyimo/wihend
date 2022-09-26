import type {AppState} from './type';
import {defineStore} from 'pinia';
import defaultSettings from "@/config/setting.json";

const useAppStore = defineStore('app', {
    state: (): AppState => ({...defaultSettings}),

    getters: {
        getCurrentSetting(state: AppState): AppState {
            return {...state}
        },
        appDevice(state: AppState) {
            return state.device
        }
    },

    actions:{
        updateSettings(partial: Partial<AppState>){
            // @ts-ignore
            this.$patch(partial)
        },
        toggleTheme(dark: boolean){
            if(dark){
                this.theme = 'dark'
                document.body.setAttribute('arco-theme', 'dark')
            }else{
                this.theme = 'light'
                document.body.setAttribute('arco-theme', 'light')
            }
        },
        toggleDevice(device: string){
            this.device = device
        },
        toggleMenu(value: boolean){
            this.hideMenu = value
        }
    }
})

export default useAppStore
