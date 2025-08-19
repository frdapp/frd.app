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
    <h3>{{ $t("Order") }}</h3>
    <table class="layout-table table table-bordered" style="width:500px;">
        <tbody>
            <tr>
                <td>
                    {{ $t("Order No") }}
                </td>
                <td>
                    {{ order_data.order_no }}
                </td>
            </tr>
            <tr>
                <td>
                    {{ $t("Status") }}
                </td>
                <td>
                    <span v-if="order_data.status == 'WAIT_PAY'">{{$t("Wait Pay")}}</span>
                    <span v-else-if="order_data.status == 'PAYED'">{{$t("Paid")}}</span>
                    <span v-else-if="order_data.status == 'DELIVERY'">{{$t("Delivered")}}</span>
                </td>
            </tr>
            <tr>
                <td>
                    {{ $t("Price") }}
                </td>
                <td>
                    {{ order_data.price }}
                </td>
            </tr>
            <tr>
                <td>
                    {{ $t("Points") }}
                </td>
                <td>
                    {{ order_data.points }}
                </td>
            </tr>
            <tr>
                <td>
                    {{ $t("Created At") }}
                </td>
                <td>
                    {{ order_data.created_at }}
                </td>
            </tr>

        </tbody>
    </table>

    <h3>{{ $t("Product") }}</h3>


    <div v-for="order_product in order_data.order_products">

        <table class="layout-table table table-bordered" style="width:500px;">
            <tbody>
                <tr>
                    <td>
                        {{ $t("Title") }}
                    </td>
                    <td>
                        {{ order_product.title }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t("Description") }}
                    </td>
                    <td>
                        {{ order_product.description }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t("Storage") }}
                    </td>
                    <td>
                        {{ order_product.storage }} MB
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t("Duration") }}
                    </td>
                    <td>
                        {{ order_product.duration }} {{ $t("Days") }}
                    </td>
                </tr>

            </tbody>
        </table>
    </div>


    <h3>{{ $t("Payment") }}</h3>
    <div v-if="order_data.order_payment">

        <table class="layout-table table table-bordered" style="width:500px;">
            <tbody>
                <tr>
                    <td>
                        {{ $t("Payment") }}
                    </td>
                    <td>
                        {{ order_data.order_payment.pay_way }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t("Pay Amount") }}
                    </td>
                    <td>
                        USD {{ order_data.order_payment.amount }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t("Pay Points") }}
                    </td>
                    <td>
                        {{ order_data.order_payment.pay_points }}
                    </td>
                </tr>


            </tbody>
        </table>

        <h3>{{ $t("Address") }}</h3>
        <table class="layout-table table table-bordered" style="width:500px;">
            <tbody>
                <tr>
                    <td>
                        {{ $t("Email") }}
                    </td>
                    <td>
                        {{ order_data.order_address.email }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t("Phone") }}
                    </td>
                    <td>
                        {{ order_data.order_address.phone }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t("Name") }}
                    </td>
                    <td>
                        {{ order_data.order_address.first_name }} {{ order_data.order_address.last_name }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t("Address") }}
                    </td>
                    <td>
                        {{ order_data.order_address.zip }} <br />
                        {{ order_data.order_address.country }} {{ order_data.order_address.state }} <br />
                        {{ order_data.order_address.address }} <br />
                        {{ order_data.order_address.address2 }} <br />
                    </td>
                </tr>


            </tbody>
        </table>

    </div>

</template>

<script>
export default {
    created: async function () {
        var item_id = this.$route.query.id;
        if (item_id) {
            var response = await this.$api.admin_order_get(item_id)
            this.order_data = response
        }
    },
    data: function () {
        return {
            order_data: {

            },
        }
    },

    methods: {

    },

}
</script>

<style scoped></style>
