import axios from 'axios'
import { inject } from "vue";

import { useUserStore } from '@/store/modules/user'
import { useI18n } from 'vue-i18n';


function fetch_data(response)
{
    if(response.data.code == 0)
    {
        return response.data.data
    }
    else
    {
        return false
    }
}

var Api=axios.create({
    timeout:5000,
    //headers:{
        //   //'Content-Type':'application/json',
        //},
})


Api.interceptors.request.use(config=>{

    const userStore = useUserStore()
    //admin and user can not login together

    if(config.url.startsWith("/api/manage"))
    {
        var admin_token = userStore.admin.token;
        config.headers['Authentication'] = admin_token;
    }
    else if(config.url.startsWith("/api/admin"))
    {
        var token=userStore.user.token;
        config.headers['Authentication'] = token;
    }
    else
    {
        config.headers['Authentication'] = "";
    }


    return config;
});

Api.interceptors.response.use(response=>{
  if(response.data.code == 20000)
  {
    const userStore = useUserStore()
    //userStore.user.token="";

    /*
    if (window.location.pathname != "/signin")
    {
        window.location.href="/signin"
    }
        */
  }
  else if (response.data.code != 0) {
      Api.$alert("WARNING", Api.t(response.data.message))
  }

    return response
})

Api.postForm=function(url,params) {
        var config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        return this.post(url, params,config);
}

Api.api_get = async function (path,params) {
    var response = await this.get(path, {"params":params});
    return fetch_data(response)
}

Api.api_post = async function (path,params) {
    var response = await this.post(path, params);
    return fetch_data(response)
}

Api.admin_login_verify = async function (params) {
    var response = await this.post("/api/admin/login/verify", params);
    return fetch_data(response)
}


Api.admin_login_login = async function (params) {
    var response = await this.post("/api/admin/login/login", params);
    return fetch_data(response)
}

Api.admin_login_login_by_verify_code = async function (params) {
    var response = await this.post("/api/admin/login/login_by_verify_code", params);
    return fetch_data(response)
}

Api.admin_login_logout=async function(params)
{
    var response = await this.post("/api/admin/login/logout", params);
    return fetch_data(response)
}

Api.admin_login_register=async function(params)
{
    var response=await this.post("/api/admin/login/register",params);
    return fetch_data(response)
}

Api.admin_login_forgot_password=async function(params)
{
    var response = await this.post("/api/admin/login/forgot_password", params);
    return fetch_data(response)
}

Api.admin_login_forgot_password_send_email=async function(params)
{
    var response = await this.post("/api/admin/login/forgot_password_send_email", params);
    return fetch_data(response)
}

Api.admin_me_info=async function(params)
{
    var response = await this.post("/api/admin/me/info", params);
    return fetch_data(response)
}

Api.admin_me_update_username=async function(params)
{
    var response = await this.post("/api/admin/me/update_username", params);
    return fetch_data(response)
}

Api.admin_me_update_password=async function(params)
{
    var response = await this.post("/api/admin/me/update_password", params);
    return fetch_data(response)
}

Api.admin_me_update_email=async function(params)
{
    var response = await this.post("/api/admin/me/update_email", params);
    return fetch_data(response)
}

Api.admin_me_update_storage_max=async function(params)
{
    var response = await this.post("/api/admin/me/update_storage_max", params);
    return fetch_data(response)
}

Api.admin_domain_list=async function(params)
{
    var response=await this.post("/api/admin/domain/list",params);
    return fetch_data(response)
}

Api.admin_domain_create=async function(params)
{
    var response=await this.post("/api/admin/domain/create",params);
    return fetch_data(response)
}

Api.admin_domain_update=async function(params)
{
    var response = await this.post("/api/admin/domain/update", params);
    return fetch_data(response)
}

Api.admin_domain_delete=async function(params)
{
    var response = await this.post("/api/admin/domain/delete", params);
    return fetch_data(response)
}

Api.admin_domain_get=async function(id)
{
    var response = await this.get("/api/admin/domain/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.admin_email_list=async function(params)
{
    var response = await this.post("/api/admin/email/list", params);
    return fetch_data(response)
}

Api.admin_email_create=async function(params)
{
    var response = await this.post("/api/admin/email/create", params);
    return fetch_data(response)
}

Api.admin_email_update_password=async function(params)
{
    var response=await this.post("/api/admin/email/update_password",params);
    return fetch_data(response)
}

Api.admin_email_delete=async function(params)
{
    var response= await this.post("/api/admin/email/delete",params);
    return fetch_data(response)
}

Api.admin_email_get=async function(id)
{
    var response = await this.get("/api/admin/email/get", {"params":{"id":id}});
    return fetch_data(response)
}



Api.admin_user_list=async function(params)
{
    var response = await this.post("/api/admin/user/list", params);
    return fetch_data(response)
}

Api.admin_user_create=async function(params)
{
    var response = await this.post("/api/admin/user/create", params);
    return fetch_data(response)
}

Api.admin_user_update=async function(params)
{
    var response=await this.post("/api/admin/user/update",params);
    return fetch_data(response)
}

Api.admin_user_delete=async function(params)
{
    var response= await this.post("/api/admin/user/delete",params);
    return fetch_data(response)
}
Api.admin_user_get=async function(id)
{
    var response = await this.get("/api/admin/user/get", {"params":{"id":id}});
    return fetch_data(response)
}


Api.admin_storage_list=async function(params)
{
    var response = await this.post("/api/admin/storage/list", params);
    return fetch_data(response)
}

Api.admin_storage_create=async function(params)
{
    var response = await this.post("/api/admin/storage/create", params);
    return fetch_data(response)
}

Api.admin_storage_update=async function(params)
{
    var response=await this.post("/api/admin/storage/update",params);
    return fetch_data(response)
}

Api.admin_storage_delete=async function(params)
{
    var response= await this.post("/api/admin/storage/delete",params);
    return fetch_data(response)
}

Api.admin_storage_get=async function(id)
{
    var response = await this.get("/api/admin/storage/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.admin_ticket_list=async function(params)
{
    var response = await this.post("/api/admin/ticket/list", params);
    return fetch_data(response)
}

Api.admin_ticket_create=async function(params)
{
    var response = await this.post("/api/admin/ticket/create", params);
    return fetch_data(response)
}

Api.admin_ticket_update=async function(params)
{
    var response=await this.post("/api/admin/ticket/update",params);
    return fetch_data(response)
}

Api.admin_ticket_delete=async function(params)
{
    var response= await this.post("/api/admin/ticket/delete",params);
    return fetch_data(response)
}

Api.admin_ticket_append_message=async function(params)
{
    var response= await this.post("/api/admin/ticket/append_message",params);
    return fetch_data(response)
}

Api.admin_ticket_get=async function(id)
{
    var response = await this.get("/api/admin/ticket/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.admin_log_list=async function(params)
{
    var response = await this.post("/api/admin/log/list", params);
    return fetch_data(response)
}



Api.admin_product_get=async function(id)
{
    var response = await this.get("/api/admin/product/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.admin_product_list=async function(params)
{
    var response = await this.post("/api/admin/product/list", params);
    return fetch_data(response)
}

Api.admin_order_create_payment_checkouturl=async function(params)
{
    var response = await this.post("/api/admin/order/create_payment_checkouturl", params);
    return fetch_data(response)
}

Api.admin_order_pay=async function(params)
{
    var response = await this.post("/api/admin/order/pay", params);
    return fetch_data(response)
}

Api.admin_order_create=async function(params)
{
    var response = await this.post("/api/admin/order/create", params);
    return fetch_data(response)
}


Api.admin_order_list=async function(params)
{
    var response = await this.post("/api/admin/order/list", params);
    return fetch_data(response)
}


Api.admin_order_get=async function(id)
{
    var response = await this.get("/api/admin/order/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.admin_alias_domain_list=async function(params)
{
    var response = await this.get("/api/admin/alias_domain/list", {"params":params});
    return fetch_data(response)
}

Api.admin_alias_domain_get=async function(id)
{
    var response = await this.get("/api/admin/alias_domain/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.admin_alias_domain_create=async function(params)
{
    var response = await this.post("/api/admin/alias_domain/create", params);
    return fetch_data(response)
}

Api.admin_alias_domain_update=async function(params)
{
    var response = await this.post("/api/admin/alias_domain/update", params);
    return fetch_data(response)
}

Api.admin_alias_domain_delete=async function(params)
{
    var response = await this.post("/api/admin/alias_domain/delete", params);
    return fetch_data(response)
}

Api.admin_alias_list=async function(params)
{
    var response = await this.get("/api/admin/alias/list", {"params":params});
    return fetch_data(response)
}

Api.admin_alias_get=async function(id)
{
    var response = await this.get("/api/admin/alias/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.admin_alias_create=async function(params)
{
    var response = await this.post("/api/admin/alias/create", params);
    return fetch_data(response)
}

Api.admin_alias_update=async function(params)
{
    var response = await this.post("/api/admin/alias/update", params);
    return fetch_data(response)
}

Api.admin_alias_delete=async function(params)
{
    var response = await this.post("/api/admin/alias/delete", params);
    return fetch_data(response)
}

//manage

Api.manage_index_stat = async function (params) {
    var response = await this.post("/api/manage/index/stat", params);
    return fetch_data(response)
}

Api.manage_login_login = async function (params) {
    var response = await this.post("/api/manage/login/login", params);
    return fetch_data(response)
}

Api.manage_login_logout=async function(params)
{
    var response = await this.post("/api/manage/login/logout", params);
    return fetch_data(response)
}


Api.manage_admin_list=async function(params)
{
    var response = await this.post("/api/manage/admin/list", params);
    return fetch_data(response)
}

Api.manage_admin_create=async function(params)
{
    var response = await this.post("/api/manage/admin/create", params);
    return fetch_data(response)
}

Api.manage_admin_update=async function(params)
{
    var response=await this.post("/api/manage/admin/update",params);
    return fetch_data(response)
}

Api.manage_admin_delete=async function(params)
{
    var response= await this.post("/api/manage/admin/delete",params);
    return fetch_data(response)
}

Api.manage_admin_get=async function(id)
{
    var response = await this.get("/api/manage/admin/get", {"params":{"id":id}});
    return fetch_data(response)
}


Api.manage_user_list=async function(params)
{
    var response = await this.post("/api/manage/user/list", params);
    return fetch_data(response)
}

Api.manage_user_create=async function(params)
{
    var response = await this.post("/api/manage/user/create", params);
    return fetch_data(response)
}

Api.manage_user_update=async function(params)
{
    var response=await this.post("/api/manage/user/update",params);
    return fetch_data(response)
}

Api.manage_user_delete=async function(params)
{
    var response= await this.post("/api/manage/user/delete",params);
    return fetch_data(response)
}

Api.manage_user_get=async function(id)
{
    var response = await this.get("/api/manage/user/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_user_add_points=async function(params)
{
    var response = await this.post("/api/manage/user/add_points", params)
    return fetch_data(response)
}



Api.manage_domain_list=async function(params)
{
    var response = await this.post("/api/manage/domain/list", params);
    return fetch_data(response)
}

Api.manage_domain_create=async function(params)
{
    var response = await this.post("/api/manage/domain/create", params);
    return fetch_data(response)
}

Api.manage_domain_update=async function(params)
{
    var response=await this.post("/api/manage/domain/update",params);
    return fetch_data(response)
}

Api.manage_domain_delete=async function(params)
{
    var response= await this.post("/api/manage/domain/delete",params);
    return fetch_data(response)
}


Api.manage_domain_get=async function(id)
{
    var response = await this.get("/api/manage/domain/get", {"params":{"id":id}});
    return fetch_data(response)
}


Api.manage_email_list=async function(params)
{
    var response = await this.post("/api/manage/email/list", params);
    return fetch_data(response)
}

Api.manage_email_create=async function(params)
{
    var response = await this.post("/api/manage/email/create", params);
    return fetch_data(response)
}

Api.manage_email_update=async function(params)
{
    var response=await this.post("/api/manage/email/update",params);
    return fetch_data(response)
}

Api.manage_email_delete=async function(params)
{
    var response= await this.post("/api/manage/email/delete",params);
    return fetch_data(response)
}

Api.manage_email_get=async function(id)
{
    var response = await this.get("/api/manage/email/get", {"params":{"id":id}});
    return fetch_data(response)
}


Api.manage_ticket__list=async function(params)
{
    var response = await this.post("/api/manage/ticket/list", params);
    return fetch_data(response)
}

Api.manage_ticket_create=async function(params)
{
    var response = await this.post("/api/manage/ticket/create", params);
    return fetch_data(response)
}

Api.manage_ticket_update=async function(params)
{
    var response=await this.post("/api/manage/ticket/update",params);
    return fetch_data(response)
}

Api.manage_ticket_delete=async function(params)
{
    var response= await this.post("/api/manage/ticket/delete",params);
    return fetch_data(response)
}

Api.manage_ticket_get=async function(id)
{
    var response = await this.get("/api/manage/ticket/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_ticket_append_message=async function(params)
{
    var response= await this.post("/api/manage/ticket/append_message",params);
    return fetch_data(response)
}


Api.manage_storage_list=async function(params)
{
    var response = await this.post("/api/manage/storage/list", params);
    return fetch_data(response)
}

Api.manage_storage_create=async function(params)
{
    var response = await this.post("/api/manage/storage/create", params);
    return fetch_data(response)
}

Api.manage_storage_update=async function(params)
{
    var response=await this.post("/api/manage/storage/update",params);
    return fetch_data(response)
}

Api.manage_storage_delete=async function(params)
{
    var response= await this.post("/api/manage/storage/delete",params);
    return fetch_data(response)
}

Api.manage_storage_get=async function(id)
{
    var response = await this.get("/api/manage/storage/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_ticket_list=async function(params)
{
    var response = await this.post("/api/manage/ticket/list", params);
    return fetch_data(response)
}

Api.manage_ticket_create=async function(params)
{
    var response = await this.post("/api/manage/ticket/create", params);
    return fetch_data(response)
}

Api.manage_ticket_update=async function(params)
{
    var response=await this.post("/api/manage/ticket/update",params);
    return fetch_data(response)
}

Api.manage_ticket_delete=async function(params)
{
    var response= await this.post("/api/manage/ticket/delete",params);
    return fetch_data(response)
}



Api.manage_log_list=async function(params)
{
    var response = await this.post("/api/manage/log/list", params);
    return fetch_data(response)
}


Api.manage_log_get=async function(id)
{
    var response = await this.get("/api/manage/log/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_product_get=async function(id)
{
    var response = await this.get("/api/manage/product/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_product_list=async function(params)
{
    var response = await this.post("/api/manage/product/list", params);
    return fetch_data(response)
}

Api.manage_product_create=async function(params)
{
    var response = await this.post("/api/manage/product/create", params);
    return fetch_data(response)
}


Api.manage_product_update=async function(params)
{
    var response= await this.post("/api/manage/product/update",params);
    return fetch_data(response)
}

Api.manage_order_list=async function(params)
{
    var response = await this.post("/api/manage/order/list", params);
    return fetch_data(response)
}

Api.manage_activity_get=async function(id)
{
    var response = await this.get("/api/manage/activity/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_activity_list=async function(params)
{
    var response = await this.post("/api/manage/activity/list", params);
    return fetch_data(response)
}

Api.manage_activity_create=async function(params)
{
    var response = await this.post("/api/manage/activity/create", params);
    return fetch_data(response)
}


Api.manage_activity_update=async function(params)
{
    var response= await this.post("/api/manage/activity/update",params);
    return fetch_data(response)
}

Api.manage_order_list=async function(params)
{
    var response = await this.post("/api/manage/order/list", params);
    return fetch_data(response)
}

Api.manage_order_get=async function(id)
{
    var response = await this.get("/api/manage/order/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_alias_domain_list=async function(params)
{
    var response = await this.get("/api/manage/alias_domain/list", {"params":params});
    return fetch_data(response)
}

Api.manage_alias_domain_get=async function(id)
{
    var response = await this.get("/api/manage/alias_domain/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_alias_list=async function(params)
{
    var response = await this.get("/api/manage/alias/list", {"params":params});
    return fetch_data(response)
}

Api.manage_alias_get=async function(id)
{
    var response = await this.get("/api/manage/alias/get", {"params":{"id":id}});
    return fetch_data(response)
}



Api.manage_email_template_list=async function(params)
{
    var response = await this.get("/api/manage/email_template/list", {"params":params});
    return fetch_data(response)
}

Api.manage_email_template_create=async function(params)
{
    var response = await this.post("/api/manage/email_template/create", params);
    return fetch_data(response)
}

Api.manage_email_template_update=async function(params)
{
    var response = await this.post("/api/manage/email_template/update", params);
    return fetch_data(response)
}

Api.manage_email_template_delete=async function(params)
{
    var response = await this.post("/api/manage/email_template/delete", params);
    return fetch_data(response)
}

Api.manage_email_template_get=async function(id)
{
    var response = await this.get("/api/manage/email_template/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_guest_message_list=async function(params)
{
    var response = await this.get("/api/manage/guest_message/list", {"params":params});
    return fetch_data(response)
}

Api.manage_guest_message_get=async function(id)
{
    var response = await this.get("/api/manage/guest_message/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_guest_message_delete=async function(params)
{
    var response = await this.post("/api/manage/guest_message/delete", params);
    return fetch_data(response)
}


Api.manage_email_send_log_list=async function(params)
{
    var response = await this.get("/api/manage/email_send_log/list", {"params":params});
    return fetch_data(response)
}

Api.manage_email_send_log_get=async function(id)
{
    var response = await this.get("/api/manage/email_send_log/get", {"params":{"id":id}});
    return fetch_data(response)
}

Api.manage_email_send_log_delete=async function(params)
{
    var response = await this.post("/api/manage/email_send_log/delete", params);
    return fetch_data(response)
}

Api.admin_email_send_verify_code=async function(params)
{
    var response = await this.post("/api/admin/email/send_verify_code", params);
    return fetch_data(response)
}


//frontend
Api.product_list=async function(params)
{
    var response = await this.post("/api/product/list", params);
    return fetch_data(response)
}

Api.send_message=async function(params)
{
    var response = await this.post("/api/message/send", params);
    return fetch_data(response)
}

export function createApi(i18n) {
    return {
        install: function (app) {
            const t = i18n.global.t;


            Api.$alert = app.config.globalProperties.$alert;
            Api.$router = app.config.globalProperties.$router;
            Api.t = t

            app.config.globalProperties.$api = Api
        }
    }
}
