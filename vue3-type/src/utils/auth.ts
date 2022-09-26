import {LOCAL_TOKEN_KEY} from '@/config/config'

const isLogin = () => {
  return !!localStorage.getItem(LOCAL_TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(LOCAL_TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(LOCAL_TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(LOCAL_TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
