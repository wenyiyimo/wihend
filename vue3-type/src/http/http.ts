import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import qs from 'qs';
import {Message, Modal} from '@arco-design/web-vue';
import store from '@/store/index';
import { getToken } from '@/utils/auth';
import { API_BASE_URL } from '@/config/config';
import md5 from 'js-md5';

const defaultConfig = {
    baseURL: API_BASE_URL,
    timeout: 10000,
}
class Http {

    private static axiosInstance = axios.create(defaultConfig)

    //请求拦截
    private httpInterceptorsRequest() {
        Http.axiosInstance.interceptors.request.use((config:AxiosRequestConfig) => {
            // 在发送请求之前做一些处理
            /*if (store.state.token) {
                config.headers['token'] = store.state.token;
            }*/
            return config;
        }, error => {
            // 发送请求失败
            return Promise.reject(error);
        })
    }

    /*响应拦截*/
    private httpInterceptorsResponse() {
        Http.axiosInstance.interceptors.response.use((response:AxiosResponse) => {
            // 对响应数据做一些处理
            return response;
        },error => {
            return Promise.reject(error);
        })
    }

    /*
    * 封装请求
    * */
    public get<T>(url:string,params:AxiosRequestConfig):Promise<T>{
        return Http.axiosInstance.get(url,params).then(res => res.data).catch()
    }
    public post<T>(url:string,params:AxiosRequestConfig):Promise<T>{
        return Http.axiosInstance.post(url,params).then(res => res.data).catch()
    }

}

export const http = new Http();


