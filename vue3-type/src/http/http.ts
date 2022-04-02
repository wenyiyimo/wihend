import axios from 'axios'
import {LOCAL_TOKEN_KEY, STORAGE_KEY, API_BASE_URL} from './config';
import md5 from 'js-md5';
import store from "../store/store";

const HTTP_TOKEN_KEY = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'qx-ua': md5(store.state.clientIdent).toString().toLowerCase(),
    'qx-pk': store.state.privateKey,
    'qx-client': store.state.clientIdent,
    'qx-tk': store.state.token || ''
}

export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: HTTP_TOKEN_KEY
})


export const setHttpToken = (token: string) => {
    localStorage.setItem(LOCAL_TOKEN_KEY, token);
    http.defaults.headers.common[STORAGE_KEY.USER_KEY] = token;
}

export function clearHttpToken() {
    localStorage.removeItem(LOCAL_TOKEN_KEY);
    http.defaults.headers.common[STORAGE_KEY.USER_KEY] = '';
}
