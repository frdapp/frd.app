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
                <td>{{ $t('Order No')}}</td>
                <td>
                    {{ order_data.order_no }}
                </td>
            </tr>
            <tr>
                <td>{{ $t("status")}}</td>
                <td>
                    {{ order_data.status }}
                </td>
            </tr>
            <tr>
                <td>{{ $t("Price") }}</td>
                <td>
                    {{ order_data.price }} 
                </td>
            </tr>
            <tr>
                <td>{{ $t("Points") }}</td>
                <td>
                    {{ order_data.points }}
                </td>
            </tr>
            <tr>
                <td>{{ $t("Created At") }}</td>
                <td>
                    {{ order_data.created_at }} 
                </td>
            </tr>
        </table>


        <h3 class="">Products</h3>
        <table class="layout-table border table-strip" style="width:600px">
            <tr>
                <th>
                    {{ $t("Title") }}
                </th>
                <th>
                    {{ $t("Description") }}
                </th>
                <th>
                    {{ $t("Storage") }}
                </th>
                <th>
                    {{ $t("Amount") }}
                </th>
            </tr>
            <tr v-for="order_product in order_data.order_products">
                <td>
                        {{ order_product.title }}
                </td>
                <td>
                        {{ order_product.description }}
                </td>
                <td>
                        {{ order_product.storage }}
                </td>
                <td>
                        {{ order_product.amount }}
                </td>
            </tr>
        </table>
        <h3 class="">Payment</h3>
            <div v-if="order_data.order_payment">
                Payway: {{ order_data.order_payment.pay_way }}   <br/>
                Pay Amount: {{ order_data.order_payment.pay_amount }}   <br/>
                Pay Points: {{ order_data.order_payment.pay_points }}   <br/>
                Created At :{{ order_data.order_payment.created_at }}   <br/>
            </div>
</template>

<script>
    export default {
        created:async function(){
            var item_id=this.$route.query.id;
            if(item_id)
            {
                var response= await this.$api.manage_order_get(item_id)
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
