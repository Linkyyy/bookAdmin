import axios from 'axios'
import config from './config'
import store from './store/index'

axios.defaults.baseURL = config.baseUrl;
axios.defaults.withCredentials = true

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//请求拦截
axios.interceptors.request.use(config => {
    store.commit("setIsLoading", true);
    return config;
}, error => {
    return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response => {
    store.commit("setIsLoading", false);
    return response;
}, error => {
    store.commit("setIsLoading", false);
    return Promise.reject(error);
})

export default axios