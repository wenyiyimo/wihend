import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import { UserState } from '@/store/user/type';
import { http } from '@/http/http';


export function login(data:AxiosRequestConfig) {
  return http.post('/api/user/UserIndex/login', data);
}

export function logout() {
  return http.post('/api/user/UserIndex/logout',{});
}

export function getUserInfo() {
  return http.post('/api/forum/user/getUserInfo',{});
}
