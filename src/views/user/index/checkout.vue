<script setup>
import VBox from "@/components/VBox.vue"
import HBox from "@/components/HBox.vue"
import Input from "@/components/Input.vue"
import Select from "@/components/Select.vue"
import Button from "@/components/Button.vue"
import Textarea from "@/components/Textarea.vue"
import Stepper from "@/components/Stepper.vue"
import StepperContent from "@/components/StepperContent.vue"
</script>

<template>

    <div class="" style="margin-top:100px">
        <HBox>
            <VBox style="gap:10px;">
                <h3>{{ $t("Product") }}</h3>

                <Select v-model="product_id" @change="on_choose_product">
                    <option v-for="product in products" :value="product.id">{{ product.title }}</option>
                </Select>

                <div class="card" >
                    <div class="card-header">
                        {{ product.title }}
                    </div>
                    <div class="card-body">
                        <p> {{ product.description }} </p>
                        <small>Stock:  {{ product.stock }} </small>
                        <br />
                        <br />
                        Storage {{ product.storage }}
                        <br />
                        {{ product.duration }} {{ $t("Days") }}<br />
                        <br />
                        Price ${{ product.price }} Or  Points {{ product.points }} <br />

                    </div>
        
                </div>

                <h3>
                        {{ $t('Billing address') }}
                </h3>


                <table>
                    <tr>
                        <td>
                            <Input v-model="cart.first_name" :placeholder="$t('First name')" />
                        </td>
                        <td>
                            <Input v-model="cart.last_name" :placeholder="$t('Last name')" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <Input v-model="cart.email" :placeholder="$t('Email')" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <Input v-model="cart.phone" :placeholder="$t('Phone')" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <Input v-model="cart.address" :placeholder="$t('Address')" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <Input v-model="cart.address2" :placeholder="$t('Address2')" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <Input v-model="cart.country" :placeholder="$t('Country')" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <Input v-model="cart.state" :placeholder="$t('State')" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <Input v-model="cart.zip" :placeholder="$t('zip')" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                        </td>
                    </tr>

                </table>

            <h3>
            {{ $t('Payment') }} 
            </h3>
                        <Select v-model="cart.pay_way">
                            <option value="MONEY">USD</option>
                            <option value="POINTS">POINTS</option>
                        </Select>



            </VBox>
            <VBox style="justify-content: flex-start;margin-left:30px">
                <h3>{{$t("Cart")}}</h3>
                <table class="table ">
                    <tbody>
                        <tr>
                            <td>
                                {{ $t("Product") }}

                            </td>
                            <td>
                                {{ product.title }}
                            </td>
                        </tr>
            
                        <tr>
                            <td>
                                {{ $t("Total") }}

                            </td>
                            <td>
                                <span v-if="cart.pay_way == 'MONEY'"> USD {{ product.price }}</span>
                                <span v-if="cart.pay_way == 'POINTS'"> {{$t("Points")}} {{ product.points }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <Button  @click="checkout()">{{ $t('Checkout') }}</Button>
            </VBox>

        </HBox>

    </div>
</template>

<script>
export default {
    created: async function () {
        var response = await this.$api.admin_product_list({ "page_size": 999 });
        if (response == false) return false;
        this.products = response.items;

        this.product_id = this.$route.query.product_id ?? 0;
        this.order_no = this.$route.query.order_no ?? "";

        this.cart.product_id = this.product_id;


        if (this.product_id == false) 
        {
            if (this.products.length > 0) 
            {
                this.cart.product_id = this.products[0].id;
                this.product_id = this.products[0].id;
            }
        }

        this.on_choose_product();

        var response = await this.$api.api_get("/api/admin/address/get")
        if(response)
        {
            this.cart.email=response.email
            this.cart.phone=response.phone
            this.cart.first_name=response.first_name
            this.cart.last_name=response.last_name
            this.cart.country=response.country
            this.cart.state=response.state
            this.cart.address=response.address
            this.cart.address2=response.address2
            this.cart.zip=response.zip
        }
    },
    data: function () {
        return {
            products:[],
            product: {},
            cart:{
                product_id:0,
                pay_way:"MONEY",
                first_name:"",
                last_name:"",
                email:"",
                phone:"",
                country:"",
                state:"",
                address:"",
                address2:"",
                zip:"",

            },
        }
    },

    methods: {
        on_choose_product:function(){
            for(var index in this.products)
            {
                if(this.products[index].id == this.product_id)
            {

                this.product=this.products[index]
            }

        }

        },
        checkout:async function(){
            if(this.product_id == false){
                this.$alert("WARNING",this.$t("please choose product"));
                return false;
            }

            var response = await this.$api.api_post("/api/admin/order/checkout",this.cart);
            if (response == false) return false;

            if (this.cart.pay_way == "POINTS") {

                this.$router.push({ "path": "/admin/storage" })
            }
            else if (this.cart.pay_way == "MONEY") {
                window.location.href=response.checkout_url;
            }
        },
    },
}
</script>

<style scoped>
.layout-grid {
    display: grid;
    gap: 10px;
    width: 800px;
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);
}
</style>
