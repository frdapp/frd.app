<script setup>
import MenuItem from "@/components/MenuItem.vue"
import { useUserStore } from '@/store/modules/user'
import { useRoute } from 'vue-router'

</script>
<template>
    <div class="sidebar">
        <div style="height:60px;display:flex;align-items: center;justify-content: start;border-bottom:solid 1px rgb(102, 100, 97)">
             <img src="@/assets/logo_manage.png" style="width:100px;"> </img>
        </div>
        <div style="height:30px;width:100%">
        </div>
        <MenuItem path="/manage/dashboard" :current_path="current_path">
            Dashboard
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/admin" :current_path="current_path">
            Admin
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/product" :current_path="current_path">
            Product
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/activity" :current_path="current_path">
            Activity
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/user" :current_path="current_path">
            User
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/order" :current_path="current_path">
            Order
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/domain" :current_path="current_path">
            Domain
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/alias_domain" :current_path="current_path">
            Domain Alias
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/email" :current_path="current_path">
            Email
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/alias" :current_path="current_path">
            Email Alias
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/storage" :current_path="current_path">
            Storage
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/ticket" :current_path="current_path">
            Tickets
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/email_template" :current_path="current_path">
            Email Template
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/guest_message" :current_path="current_path">
            Guest Message
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/email_send_log" :current_path="current_path">
            Email Send Log
        </MenuItem>
        <MenuItem class="menu-item" path="/manage/log" :current_path="current_path">
            Log
        </MenuItem>
        <a class="menu-item"  @click="logout()" style="color:#ff0000">
                Logout
        </a>
    </div>


</template>
<script>
export default {

  data() {
    return {
      current_path: this.$route.path, // 初始化为当前路由的路径
    };
  },
  methods:{
    logout:async function(){
        var response=await this.$api.admin_login_logout();

        const userStore = useUserStore()
        userStore.adminClear()

        this.$router.push({ path: "/", query: {  }} ) ;

    },
  },
  watch: {
    '$route'(to, from) {
      this.current_path = to.path;
    }
  }
};
</script>

<style scoped>
.sidebar{
    background-color:#000000;
    color:#ffffff;
    min-height:500px;
    width:250px;

}
</style>
