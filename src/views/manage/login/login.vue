<script setup>
import  VBox from '@/components/VBox.vue'
import  Input from '@/components/Input.vue'
import  Button from '@/components/Button.vue'

import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

</script>

<template>
  <VBox style="width:100%;align-items: center;margin-top:200px;">
    <div class="card" style="width:400px">
      <div class="card-body">
        <div class="card-title">
               <h2> Login</h2>
        </div>


        <div>
              <label class="form-control-label" for="username">Username</label>
        </div>
        <div>
              <Input v-model="form.username" type="text" class="form-control" style="width:100%" required />
        </div>
        <div>
              <label class="form-control-label" for="password">Password</label>
        </div>
        <div>
              <Input id="password-field" v-model="form.password" type="password" class="form-control" style="width:100%" required />
              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
        </div>
        <div>
              <Button  @click="login" class="btn-primary btn-block">Login</Button>
        </div>
        <div>
        </div>
      </div>
    </div>

  </VBox>

</template>

        <script>

import { useUserStore } from '@/store/modules/user'
    const userStore = useUserStore()


            export default {
                data:function(){
                    return {
                        form:{
                            "username":"",
                            "password":"",
                        }
                    }
                },

                methods:{
                    login:async function(){
                        var response=await this.$api.manage_login_login(this.form);
                        if(response == false ) return false;

                        userStore.adminSet(response)
                        this.$router.push({"path":"/"});

                    }
                }
            }
        </script>


<style scoped>
</style>