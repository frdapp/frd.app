import store from './store'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'


import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import './assets/css/material-kit-pro.css'




import Api from './api'


import { createApp } from 'vue'

import  func  from './functions.js'

import 'boxicons'


const app=createApp(App)
app.config.globalProperties.$api=Api;
app.config.globalProperties.$func=func


app.use(store)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
