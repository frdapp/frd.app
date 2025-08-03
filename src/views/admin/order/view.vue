<script setup>
    import VBox from "@/components/VBox.vue"
    import HBox from "@/components/HBox.vue"
    import Input from "@/components/Input.vue"
    import Select from "@/components/Select.vue"
    import Button from "@/components/Button.vue"
    import Textarea from "@/components/Textarea.vue"
import { data } from "autoprefixer"
</script>

<template>
        <table class="layout-table" style="">
            <tr>
                <td>
                <label class="form-control-label">Order No</label>
                </td>
                <td>
                    <pre>

                    Order No: {{ order_data.order_no }}
                    Status: {{ order_data.status }}
                    Price: {{ order_data.price }}
                    Points: {{ order_data.points }}
                    Created At :{{ order_data.created_at }}
                    </pre>

                    <br/>

                    <div v-for="order_product in order_data.order_products">
                        <pre>
                        Title: {{ order_product.title }}
                        Description: {{ order_product.description }}
                        Storage: {{ order_product.storage }}
                        Amount: {{ order_product.amount }}
                        </pre>
                    </div>

                    <div v-if="order_data.order_payment">
                        <pre>
                        Payway:{{ order_data.order_payment.pay_way }}
                        pay amount:{{ order_data.order_payment.pay_amount }}
                        pay points:{{ order_data.order_payment.pay_points }}
                        crated_at:{{ order_data.order_payment.created_at }}
                        </pre>

                    </div>
                </td>
            </tr>
        </table>

        <div v-if="order_data.status == 'WAIT_PAY'">
            <Button @click="pay_by_points">Pay By Points</Button>
            <Button @click="pay_by_price">Pay By Price</Button>
        </div>
</template>

<script>
    export default {
        created:async function(){
            var item_id=this.$route.query.id;
            if(item_id)
            {
                var response= await this.$api.admin_order_get(item_id)
                this.order_data = response
            }
        },
        data: function(){
            return {
                order_data:{

                },
            }
        },

        methods:{
            pay_by_points:function(){

            },
            pay_by_price:async function(){
                var response=await this.$api.admin_order_create_payment_checkouturl({"id":this.order_data["id"]})
                if(response == false) return false;

                window.location.href=response.checkout_url;
            },
        },

    }
</script>

<style scoped>

</style>
