<script setup>
import Input from "@/components/Input.vue";
import Sidebar from "@/layout/admin/sidebar.vue";
import VBox from "@/components/VBox.vue"
import HBox from "@/components/HBox.vue"
</script>

<template>
  <HBox style="min-height:100%">


    <Sidebar style="position:fixed;top:0;bottom:0;" />

    <VBox style="justify-content: flex-start;margin-left:250px;width:100%;">
          <HBox style="height:60px;width:90%;background-color:white;align-items:center" class="border-bottom">  
            <div style="margin-left:24px">
              <strong>{{user.email}} </strong>
              {{$t("Points")}} <strong>{{user.points}} </strong> | 
              {{$t("Storage")}} <strong>{{ user.storage_used }}</strong>/<strong>{{user.storage_current}} MB </strong>
              {{$t("Network")}} <strong>{{ user.network_used }}</strong>/<strong>{{user.network_current}} MB </strong>

                <a href="/checkout" style="margin-left:10px">{{ $t("Buy Storage ") }}</a>
            </div>
          </HBox>
          <VBox style="width:90%">
            <div style="margin-left:24px;margin-top:24px;width:100%">
              <router-view />
            </div>
          </VBox>
    </VBox>
    <!--
    <footer class="footer">
        <VBox style="width:100%;height:100px;align-items: center;background-color:#eaeae4">

                <div class="">Copyright &copy; frd.app 2025</div>
        </VBox>
    </footer>
    -->


  </HBox>
</template>

<script>
//import { useUserStore } from '@/store/modules/user'
//const userStore = useUserStore()

export default {
  data() {
    return {
      now:this.$func.today(),
      user:{}
    };
  },
  created: async function(){
    var response=await this.get_user_info()
    if (response == false) {
      this.$router.push({"path":"/"})
      return false;
    }

    if(response.is_verified == false) {
      this.$router.push({"path":"/verify","query":{"email":response.email}})
    }

  },

  methods: {
      get_user_info:async function() {
            var response = await this.$api.api_get("/api/admin/me/stat")
            if(response == false) return false;

            this.user = response
      }
  },
};
</script>
