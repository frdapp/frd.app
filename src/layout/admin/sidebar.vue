<script setup>
import MenuItem from "@/components/MenuItem.vue"
import { useUserStore } from '@/store/modules/user'
import { useRoute } from 'vue-router'



</script>
<template>
    <div class="sidebar border-end">
        <div style="height:60px;display:flex;align-items: center;justify-content: start;border-bottom:none 1px #cccccc">
            <a href="/">
                <img src="@/assets/logo_bg.png" style="width:100px;"> </img>
            </a>
        </div>
        <div style="height:30px;width:100%">
        </div>
        <!--
        <MenuItem path="/admin/dashboard" :current_path="current_path">
            Dashboard
        </MenuItem>
        <MenuItem class="menu-item" path="/admin/admin"  :current_path="current_path">
            Admin
        </MenuItem>
        -->
        <MenuItem class="menu-item" path="/admin/domain"  :current_path="current_path">
            Domain
        </MenuItem>
        <!--
        <MenuItem class="menu-item" path="/admin/alias_domain"  :current_path="current_path">
            Domain Alias
        </MenuItem>
        -->
        <MenuItem class="menu-item" path="/admin/email" :current_path="current_path">
            Email
        </MenuItem>
        <!--
        <MenuItem class="menu-item" path="/admin/alias" :current_path="current_path">
            Email Alias
        </MenuItem>
        -->
        <MenuItem class="menu-item" path="/admin/order" :current_path="current_path">
            Order
        </MenuItem>
        <MenuItem class="menu-item" path="/admin/storage" :current_path="current_path">
            Storage
        </MenuItem>
        <MenuItem class="menu-item" path="/admin/ticket" :current_path="current_path">
            Tickets
        </MenuItem>
        <MenuItem class="menu-item" path="/admin/log" :current_path="current_path">
            Log
        </MenuItem>
        <!--
        <MenuItem class="menu-item" path="/admin/log" :current_path="current_path">
            Log
        </MenuItem>
        -->
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
        userStore.clear()

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
    background-color:#ffffff;
    color:#373535;
    min-height:500px;
    width:250px;

}
</style>
