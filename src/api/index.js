import axios from 'axios'
import { inject } from "vue";

import { useUserStore } from '@/store/modules/user'



var _api=axios.create({
    timeout:5000,
    //headers:{
     //   //'Content-Type':'application/json',
    //},
})


_api.interceptors.request.use(config=>{

    const userStore = useUserStore()
    var token=userStore.user.token;

    //config.headers["token"]=token;
    config.headers['Authentication'] = token;

    return config;
});


_api.interceptors.response.use(response=>{
    return response.data;
})


var Api = {
  // 发起GET请求
  get:function(url,params) {
    return _api.get(url, { params: params });
  },

  // 发起POST请求,
  post:function(url,params) {
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    return _api.post(url, params,config);
  },


  // 发起POST JSON 请求
   postJson:function(url,params) 
  {

    return _api.post(url, params);
  }

}

export default Api;
