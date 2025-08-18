<script setup>
import  VBox from '@/components/VBox.vue'
import  HBox from '@/components/HBox.vue'
import  Input from '@/components/Input.vue'
import  Button from '@/components/Button.vue'
import  ButtonColdDown from '@/components/ButtonColdDown.vue'

import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

</script>
<template>

  <VBox style="width:100%;align-items: center;margin-top:200px;">
    <div class="card" style="width:400px">
      <div class="card-body">
        <div class="card-title">
               <h2>{{$t('Verify')}}</h2>
        </div>


        <div>
              <label class="form-control-label" for="email">{{ $t('Email') }}</label>
        </div>
        <div>
              <Input v-model="form.email" type="text" class="form-control" style="width:100%" required autocomplete="off"/>
        </div>
        <div>
              <label class="form-control-label" >{{ $t('Verify Code') }} </label>
        </div>
        <div>
          <HBox>
              <Input v-model="form.code" class="form-control" style="width:100%" required autocomplete="off"/>
                  <!--
              <i class="material-icons" style="position:relative;right:30px;top:5px"> visibility</i>
                  -->
          </HBox>

        </div>
        <div style="margin-top:10px">
              <ButtonColdDown  duration=5 @click="send_verify_code" class="form-control btn-primary btn-block">{{ $t('Send Verify Code') }}</ButtonColdDown>
        </div>

        <div style="margin-top:10px">
              <Button  @click="verify" class="form-control btn-primary btn-block">{{ $t('Verify') }}</Button>
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
                            "email":"",
                            "code":"",
                        }
                    }
                },
                created:function(){
                  this.form.email=this.$route.query.email;
                },
                mounted:function(){
                  //this.send_verify_code();
                },
                methods:{
                    send_verify_code:async function(){
                        if(! this.form.email )
                        {
                            this.$alert("WARNING",this.$t("Please fill email"));
                            return false;
                        }

                        var response=await this.$api.admin_email_send_verify_code(this.form);
                        if(response == false ) return false;

                        this.$alert("Success",this.$t("Send Successful. Please check your email mailbox."))
                    },
                    verify:async function(){
                        var response=await this.$api.admin_login_verify(this.form);
                        if(response == false ) return false;

                        const userStore = useUserStore()
                        userStore.set(response)

                        if(this.$route.query.to_checkout)
                        {
                            this.$router.push({"path":"/checkout", query: this.$route.query });
                        }
                        else
                        {
                            this.$router.push({"path":"/admin/domain"});
                        }
                }
            
            }
          }
        </script>


<style scoped>
</style>