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
                    <h2>Forgot Password</h2>
                </div>

                <div class="form-group mt-3">
                    <label class="form-control-placeholder" for="username">Email</label>
                    <input type="text" class="form-control" required>
                </div>

                <div class="form-group">
                    <label class="form-control-placeholder" for="password">Email Verify Code</label>
                    <input id="password-field" type="text" class="form-control" required>
                    <button type="button" class="form-control btn btn-primary rounded submit px-3">Fetch Verify
                        Code</button>
                </div>

                <div class="form-group">
                    <Button class="btn-primary btn-block">Forgot Password</Button>
                </div>

                <p class="text-center">Not a member? <a data-toggle="tab" href="/register">Register</a></p>
            </div>
        </div>
    </VBox>

</template>


<script>
export default {
    data: function () {
        return {
            form: {
                "username": "",
                "password": "",
            }
        }
    },

    methods: {
        forgot_password: function () {
            return false;
            if (!this.form.username) { alert("please input username"); return false }
            if (!this.form.password) { alert("please input password"); return false }
            if (!this.form.confirm_password) { alert("please input confirm_password"); return false }

            if (this.form.password != this.form.confirm_password) {
                alert("password and confirm password not the same !");
                return false;
            }

            var self = this;

            this.$api.register(this.form).then(function () {
                alert("register after");
                if (r.response["code"] == 0) {
                    self.to("/");
                }
            });

        },
        send_mail: function () {
            if (!this.form.username) { alert("please input username"); return false }
            if (!this.form.password) { alert("please input password"); return false }
            if (!this.form.confirm_password) { alert("please input confirm_password"); return false }

            if (this.form.password != this.form.confirm_password) {
                alert("password and confirm password not the same !");
                return false;
            }


            this.$api.register(this.form).then(function () {
                alert("register after");
            });

        }
    }

}
</script>


<style scoped></style>