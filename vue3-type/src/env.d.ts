/// <reference types="vite/client" />

import { Store } from 'vuex'
import { State } from './store/store'
import { AxiosInstance } from 'axios';
import {App, defineComponent} from "vue";

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    // 为 `this.$http` 提供类型声明
    $http: AxiosInstance;
    // 为 `this.$store` 提供类型声明
    $state: Store<State>
  }
}

declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}


