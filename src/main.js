import App from './App.vue'
import router from './router'

import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import i18n from './i18n'
import {createApi} from './api'
import { createApp } from 'vue'


import Alert from './components/alert.js'
import Confirm from './components/confirm.js'
import Prompt from './components/prompt.js'
import Dialog from './components/dialog.js'

import "./assets/css/bootstrap.css";
//import "./assets/css/custom.css";




import  func  from './functions.js'
//import 'boxicons'

const app=createApp(App)
app.config.globalProperties.$func=func
app.use(i18n)
app.use(store)
app.use(VueAxios, axios)
app.use(router)
app.use(Alert)
app.use(Confirm)
app.use(Prompt)
app.use(Dialog)
app.use(createApi(i18n))

app.mount('#app')
