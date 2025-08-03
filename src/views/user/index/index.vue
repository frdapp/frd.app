<script setup>
import HBox from "@/components/HBox.vue"
import VBox from "@/components/VBox.vue"
import Button from "@/components/Button.vue"
import Input from "@/components/Input.vue"
import Textarea from "@/components/Textarea.vue"
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

            <img src="/email-4044165_1280.jpg" style="width:600px"/>
        </HBox>

        <div style="margin-top:30px">
            <h3 id="products">Products</h3>
            <div style="display:grid;grid-auto-flow: row;grid-template-columns: repeat(5, 1fr);gap:10px">
            <div class="card" v-for="product in products" style="">
                <div class="card-header">
                    <strong>{{ product.title }}</strong>
                </div>
                <div class="card-body">
                    <p>
                        {{ product.description }}
                    </p>
                    <p>
                        {{ $t("Storage")}} {{ product.storage }} GB  <br/>
                        {{$t("Price")}} {{ product.price }}  <br/>
                        {{$t("Points")}} {{ product.points }}  <br/>
                        {{$t("Stock")}} {{ product.stock }}  <br/>
                    </p>
                </div>
                <div class="card-footer">
                    <Button class="">Buy Now </Button>
                </div>
            </div>

        </div>
       </div>

        <div style="margin-top:30px">

            <h3 id="contact">Contact US</h3>
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
                                <Button @click="send_message" class="form-control btn-primary">{{ $t("Send Message") }} </Button>
                            </td>
                        </tr>

                    </table>

                </div>

            </div>
            <img src="/contact_bg.png" style="width:500px"/>
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
            }
        }
    },
    created:async function(){
        var response=await this.$api.product_list()
        if(response == false) return false;
        this.products=response.items

    },
    methods: {
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
