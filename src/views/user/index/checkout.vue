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

    <div class="layout-grid" style="margin-top:100px">
        <Stepper ref="stepper">
            <StepperContent :label="$t('Choose Product')">
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
                        Month {{ product.duration }} <br />
                        <br />
                        Price ${{ product.price }} Or  Points {{ product.points }} <br />

                        <Button  @click="create_order()">{{ $t('Next') }}</Button>

                    </div>
                    <div class="card-footer">
                    </div>
                </div>

            </StepperContent>
            <StepperContent :label="$t('Pay')">
                        Pay  By
                        <Select v-model="pay_way">
                            <option value="MONEY">USD</option>
                            <option value="POINTS">POINTS</option>
                        </Select>

                        <Button type="primary" @click="pay(product.id)">Checkout</Button>
            </StepperContent>
        </Stepper>


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
        if (this.product_id == false) 
        {
            if (this.products.length > 0) {
                this.product_id = this.products[0].id;
            }
        }

        this.on_choose_product();

        if(this.order_no != false)
        {
            this.$refs.stepper.to_next();
        }
    },
    data: function () {
        return {
            products:[],
            product: {},
            product_id:0,
            order_no:"",
            pay_way:"MONEY",
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
        create_order:async function(){
            if(this.product_id == false){
                this.$alert("WARNING",this.$t("please choose product"));
                return false;
            }

            var response = await this.$api.admin_order_create({"product_id":this.product_id})
            if (response == false) return false;

            this.order_no=response.order_no

            this.$refs.stepper.to_next();
        },
        pay: async function () {
            if (this.pay_way == "POINTS") {

                var response = await this.$api.admin_order_pay({ "order_no": this.order_no, "pay_way": this.pay_way })
                if (response == false) return false;

                this.$router.push({ "path": "/admin/storage" })
            }
            else if (this.pay_way == "MONEY") {

                var response = await this.$api.admin_order_pay({ "order_no": this.order_no, "pay_way": this.pay_way })
                if (response == false) return false;

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
