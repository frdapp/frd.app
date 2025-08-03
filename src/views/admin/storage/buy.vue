<script setup>
import VBox from "@/components/VBox.vue"
import HBox from "@/components/HBox.vue"
import Input from "@/components/Input.vue"
import Select from "@/components/Select.vue"
import Button from "@/components/Button.vue"
import Textarea from "@/components/Textarea.vue"
</script>

<template>

    <div class="layout-grid">

        <div class="card" v-for="product in products">
            <div class="card-header">
                {{ product.title }}
            </div>
            <div class="card-body">
                <p> {{ product.description }} </p>
                <small>库存 {{ product.stock }} </small>
                <br />
                <br />
                存储空间 {{ product.storage }}
                <br />
                有效时间 {{ product.duration }} <br />
                <br />
                价格 {{ product.price }} 或 积分 {{ product.points }} <br />

            </div>
            <div class="card-footer">
                <Button type="primary" @click="buy(product.id)">积分购买</Button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    created: async function () {
        var response = await this.$api.admin_product_list({ "page_size": 999 })
        if (response == false) return false;

        this.products = response.items
    },
    data: function () {
        return {
            products: [],
        }
    },

    methods: {
        buy: async function (product_id) {
            var response = await this.$api.admin_order_create({"product_id":product_id})
            if (response == false) return false;

            this.$router.back()
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
