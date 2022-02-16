import axios from 'axios'
import { LOCAL_TOKEN_KEY, HTTP_TOKEN_KEY, API_BASE_URL } from './config';


export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        [HTTP_TOKEN_KEY]: localStorage.getItem(LOCAL_TOKEN_KEY) || ''
    }
})


export const setHttpToken = (token:string) => {
    localStorage.setItem(LOCAL_TOKEN_KEY, token);
    http.defaults.headers.common[HTTP_TOKEN_KEY] = token;
}

export function clearHttpToken() {
  localStorage.removeItem(LOCAL_TOKEN_KEY);
  http.defaults.headers.common[HTTP_TOKEN_KEY] = '';
}