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
               <h2>Register</h2>
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
		              <label class="form-control-placeholder" for="password">Confirm Password</label>
        </div>
        <div>
		              <input id="password-field" v-model="form.confirm_password" type="password" class="form-control" style="width:100%" required>
		              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
        </div>
        <div>
              <Button  @click="register" class="btn-primary btn-block">Register</Button>
        </div>
        <div>
		          <p class="text-center">Already have account ? <a data-toggle="tab" href="/login">login</a></p>
		          <p class="text-center">Forgot password? <a href="/forgot_password">Forgot Password</a> </p>
        </div>
      </div>
    </div>

  </VBox>



</template>

        <script>
            export default {
                data:function(){
                    return {
                        form:{
                            "username":"",
                            "password":"",
                            "confirm_password":"",
                        }
                    }
                },

                methods:{
                    register:async function(){
                        if(this.form.password != this.form.confirm_password)
                        {
                            this.$alert("WARNING","password and confirm password not the same !");
                            return false;
                        }


                        var response=await this.$api.admin_login_register(this.form);
                        if(response == false ) return false;

                        const userStore = useUserStore()
                        userStore.set(response)
                        this.$router.push({"path":"/"});
                }
            
            }
          }
        </script>


<style scoped>
</style>