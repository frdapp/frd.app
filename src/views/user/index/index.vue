<script setup>
import HBox from "@/components/HBox.vue"
import VBox from "@/components/VBox.vue"
import Button from "@/components/Button.vue"
import Input from "@/components/Input.vue"
import Textarea from "@/components/Textarea.vue"

import { useUserStore } from '@/store/modules/user'
</script>

<template>
    <div style="margin-top:100px">
        <HBox style="justify-content: space-between;">
            <VBox style="justify-content: flex-start;">
                <H2>
                    Get Your Own Domain Emails
                </H2>
                <p>
                    Unlimit Domain Email Accounts
                </p>
                <p>
                    Cheep Storage Price
                </p>
                <p>
                    All Email Account Share Same Storage . Save your money
                </p>

            </VBox>

            <img src="/email-4044165_1280.jpg" style="width:600px" />
        </HBox>

        <div v-if="activitys.length > 0" style="margin-top:30px">
            <h3 id="products">{{ $t("Activity") }}</h3>
            <div style="display:grid;grid-auto-flow: row;grid-template-columns: repeat(5, 1fr);gap:10px">
                <div class="card" v-for="activity in activitys" style="">
                    <div class="card-header">
                        <strong>{{ activity.title }}</strong>
                    </div>
                    <div class="card-body">
                        <p v-html="activity.description">
                        </p>
                    </div>
                </div>

            </div>
        </div>

        <div style="margin-top:30px">
            <h3 id="products">{{ $t("Products") }}</h3>
            <div style="display:grid;grid-auto-flow: row;grid-template-columns: repeat(5, 1fr);gap:10px">
                <div class="card" v-for="product in products" style="">
                    <div class="card-header">
                        <strong>{{ product.title }}</strong>
                    </div>
                    <div class="card-body">
                        <p>
                            {{ product.description }}
                        </p>
                        <table style="width:100%">
                            <tr>
                                <td>{{ $t("Storage") }}</td>
                                <td style="text-align:right">{{ product.storage }} MB</td>
                            </tr>
                            <tr>
                                <td>{{ $t("Transfer") }}</td>
                                <td style="text-align:right">{{ product.storage }} MB</td>
                            </tr>
                            <tr>
                                <td>{{ $t("Duration") }}</td>
                                <td style="text-align:right">{{ product.duration }} {{ $t("Days") }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t("Price") }}</td>
                                <td style="text-align:right">$ {{ product.price }} </td>
                            </tr>
                            <tr>
                                <td>{{ $t("Points") }}</td>
                                <td style="text-align:right">{{ product.points }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t("Stock") }}</td>
                                <td style="text-align:right">{{ product.stock }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-footer">
                        <Button class="" @click="buy(product.id)">{{ $t("Buy Now") }} </Button>
                    </div>
                </div>

            </div>
        </div>

        <div style="margin-top:30px">

            <h3 id="contact">{{$t("Contact US")}}</h3>
            <HBox style="justify-content: space-between;">
                <div class="card" style="width:500px">
                    <div class="card-body">
                        <table class="layout-table" style="width:100%">
                            <tr>
                                <td style="width:150px">
                                    {{ $t("Your Name") }}
                                </td>
                                <td>
                                    <Input v-model="contact.name" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {{ $t("Your Email") }}
                                </td>
                                <td>
                                    <Input v-model="contact.email" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {{ $t("Subject") }}
                                </td>
                                <td>
                                    <Input v-model="contact.subject" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {{ $t("Message") }}
                                </td>
                                <td>
                                    <Textarea v-model="contact.message" rows="5"></Textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td>
                                    <Button @click="send_message" class="form-control btn-primary">{{ $t("Send Message")
                                        }} </Button>
                                </td>
                            </tr>

                        </table>

                    </div>

                </div>
                <img src="/contact_bg.png" style="width:500px" />
            </HBox>
        </div>
    </div>

</template>
<script>


export default {
    data: function () {
        return {
            products:[],
            contact:{
                "name":"",
                "email":"",
                "subject":"",
                "message":"",
            },
            activitys:[],
        }
    },
    created:async function(){
        var response=await this.$api.product_list()
        if(response == false) return false;
        this.products=response.items

        var response=await this.$api.api_get("/api/activity/list")
        if(response == false) return false;
        this.activitys=response.items

    },
    methods: {
        buy:function(product_id){
            const userStore = useUserStore()
            if( userStore.isLogin() == false)
            {
                this.$router.push({"path":"/login","query":{"product_id":product_id,"to_checkout":1}})
            }
            else
            {
                this.$router.push({"path":"/checkout","query":{"product_id":product_id}})
            }

        },
        send_message:async function(){
            var response=await this.$api.send_message(this.contact);
            if(response == false) return false

            this.contact={"name":"","email":"","subject":"","message":""}

            this.$alert("SUCCESS",this.$t("thank you for your message"))
        },
        logout: function (r) {
            var self = this;
            this.$api.logout().then(function (r) {
                userStore.clear()
                self.$router.push({ "path": "/" });
            });
        }
    }

}
</script>
<style scoped>
td {
    vertical-align: top;
    padding-bottom:10px;
}
</style>
