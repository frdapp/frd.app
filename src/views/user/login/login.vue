<script setup>
import VBox from '@/components/VBox.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Tab from '@/components/Tab.vue'
import TabContent from '@/components/TabContent.vue'
import  ButtonColdDown from '@/components/ButtonColdDown.vue'

import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

</script>

<template>
  <VBox style="width:100%;align-items: center;margin-top:200px;">
    <Tab>

      <TabContent :label="$t('Login By Password')">
        <div class="card" style="width:400px">
          <div class="card-body">
            <div class="card-title">
            </div>
            <div>
              <label class="form-control-label" for="email">Email</label>
            </div>
            <div>
              <Input v-model="form_password.email" type="text" class="form-control" style="width:100%" required />
            </div>
            <div>
              <label class="form-control-label" for="password">Password</label>
            </div>
            <div>
              <Input id="password-field" v-model="form_password.password" type="password" class="form-control" style="width:100%"
                required />
            </div>
            <div style="margin-top:10px;">
              <Button @click="login_by_password" class="form-control btn-primary btn-block">{{$t("Login")}}</Button>
            </div>
            <div>
              <p class="text-center">{{$t("Not a member?")}} <a data-toggle="tab" href="#" @click="to_register">{{$t("Register")}}</a></p>
            </div>
          </div>
        </div>
      </TabContent>
      <TabContent :label="$t('Login By Verify Code')">
        <div class="card" style="width:400px">
          <div class="card-body">
            <div class="card-title">
            </div>
            <div>
              <label class="form-control-label" for="email">{{ $t("Email") }}</label>
            </div>
            <div>
              <Input v-model="form_verify_code.email" type="text" class="form-control" style="width:100%" required />
            </div>
            <div>
              <label class="form-control-label" for="password">{{ $t("Verify Code") }}</label>
            </div>
            <div>
              <Input  v-model="form_verify_code.code" type="password" class="form-control" style="width:100%" required />
            </div>
            <div style="margin-top:10px;">
              <ButtonColdDown  duration=5 @click="send_verify_code" class="form-control btn-primary btn-block">{{ $t('Send Verify Code') }}</ButtonColdDown>
            </div>
            <div style="margin-top:10px;">
              <Button @click="login_by_veriy_code" class="form-control btn-primary btn-block">{{$t("Login")}}</Button>
            </div>
            <div>
              <p class="text-center">{{$t("Not a member?")}} <a data-toggle="tab" href="#" @click="to_register">{{$t("Register")}}</a></p>
            </div>
          </div>
        </div>
      </TabContent>

    </Tab>
  </VBox>

</template>

<script>

import { useUserStore } from '@/store/modules/user'


export default {
  data: function () {
    return {
      form_password: {
        "email": "",
        "password": "",
      },
      form_verify_code: {
        "email": "",
        "code": "",
      }
    }
  },

  methods: {
    to_register:function(){
        this.$router.push({
          path: '/register',
          query: this.$route.query
        });
    },
    login_by_password: async function () {
      var response = await this.$api.admin_login_login(this.form_password);
      if (response == false) return false;

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
    },
    login_by_veriy_code: async function () {
      var response = await this.$api.admin_login_login_by_verify_code(this.form_verify_code);
      if (response == false) return false;

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
    },
    send_verify_code: async function () {
      if (!this.form_verify_code.email) {
        this.$alert("WARNING", "Please fill email");
        return false;
      }

      var response = await this.$api.admin_email_send_verify_code(this.form_verify_code);
      if (response == false) return false;

      this.$alert("Success", "Send Successful. Please check your email mailbox.")
    },
  }
}
</script>


<style scoped></style>