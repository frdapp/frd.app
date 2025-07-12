<script setup>
import MenuItem from "@/components/MenuItem.vue"
import { useRoute } from 'vue-router'



</script>
<template>
    <div class="sidebar">
        <div style="height:100px;display:flex;align-items: center;justify-content: start;">
            <!-- LOGO -->
                木石科技
        </div>
        <MenuItem path="/admin/dashboard" :current_path="current_path">
            Dashboard
        </MenuItem>
        <MenuItem class="menu-item" path="/admin/admin"  :current_path="current_path">
            Admin
        </MenuItem>
        <MenuItem class="menu-item" path="/admin/domain"  :current_path="current_path">
            Domain
        </MenuItem>
        <MenuItem class="menu-item" path="/admin/email" :current_path="current_path">
            Email
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
        <MenuItem class="menu-item" path="/logout">
                Logout
        </MenuItem>
    </div>


</template>
<script>
export default {
  data() {
    return {
      currant_path:"",
    };
  },
  created: function(){
    const route = useRoute()
    this.current_path=route.path
  },
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
