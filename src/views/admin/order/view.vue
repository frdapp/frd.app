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
                    {{ order_data.order_no }}
                    {{ order_data.status }}
                    {{ order_data.price }}
                    {{ order_data.points }}
                    {{ order_data.created_at }}

                    <br/>

                    <div v-for="order_product in order_data.order_products">
                        {{ order_product.title }}
                        {{ order_product.description }}
                        {{ order_product.storage }}
                        {{ order_product.amount }}
                    </div>

                    <div v-if="order_data.order_payment">
                        {{ order_data.order_payment.pay_way }}
                        {{ order_data.order_payment.pay_amount }}
                        {{ order_data.order_payment.pay_points }}
                        {{ order_data.order_payment.created_at }}

                    </div>
                </td>
            </tr>
        </table>
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
        },

    }
</script>

<style scoped>

</style>
