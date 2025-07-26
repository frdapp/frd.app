<script setup>
import VBox from '@/components/VBox.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

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
          <label class="form-control-label" for="email">Email</label>
        </div>
        <div>
          <Input v-model="form.email" type="text" class="form-control" style="width:100%" required />
        </div>
        <div>
          <label class="form-control-label" for="password">Password</label>
        </div>
        <div>
          <Input id="password-field" v-model="form.password" type="password" class="form-control" style="width:100%"
            required />
        </div>
        <div style="margin-top:10px;">
          <Button @click="login" class="form-control btn-primary btn-block">Login</Button>
        </div>
        <div>
          <p class="text-center">Not a member? <a data-toggle="tab" href="/register">Register</a></p>
          <p class="text-center">Forgot password? <a href="/forgot_password">Forgot Password</a> </p>
        </div>
      </div>
    </div>

  </VBox>

</template>

<script>

import { useUserStore } from '@/store/modules/user'


export default {
  data: function () {
    return {
      form: {
        "email": "",
        "password": "",
      }
    }
  },

  methods: {
    login: async function () {
      var response = await this.$api.admin_login_login(this.form);
      if (response == false) return false;

      const userStore = useUserStore()
      userStore.set(response)
      this.$router.push({ "path": "/admin/domain" });

    }
  }
}
</script>


<style scoped></style>