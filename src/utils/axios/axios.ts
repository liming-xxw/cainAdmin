import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { roleStore } from "../../store/role";

export const BASE_URL = "/";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

// 请求拦截
Axios.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const roleStoreS = roleStore();
    if (roleStoreS.isLogin) {
      config.headers!.Authorization = roleStoreS.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 请求响应
Axios.interceptors.response.use(
  (response: AxiosResponse): any => {
    if (response.status == 200 || response.status == 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
