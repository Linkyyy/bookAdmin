import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import axios from './axios'


const app=createApp(App).use(store).use(router).use(ElementPlus);
app.config.globalProperties.$axios = axios;
app.mount('#app')
