<script setup>
import Pagination from '@/components/Pagination.vue'
import VBox from '@/components/VBox.vue'
import HBox from '@/components/HBox.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import Table from '@/components/Table.vue'
import Column from '@/components/Column.vue'
</script>

<template>
    <VBox style="width:100%">
        <form name="search" v-on:submit="searchPage(1)">
            <HBox style="  margin-top:10px;padding:0px;">
                <Input @keyup.enter.native="searchPage(1)" v-model="query.query" :placeholder="$t('order no')" type="text" style="width:300px;" />

                <Button style="margin-left:10px" class="btn-primary" @click="searchPage(1)"> {{ $t("Search")}}</Button>
            </HBox>
        </form>

        <!-- data -->
        <div style="margin-top:10px;padding:0px;width:100%">
            <Table :items="items" @sort-change="searchSort" style="width: 100%">

                <Column prop="order_no" :label="$t('Order No')" width="100"> </Column>
                <Column prop="price" :label="$t('Price')" width="100"> </Column>
                <Column prop="points" :label="$t('Points')" width="100"> </Column>
                <Column prop="status" :label="$t('Status')" width="100"> </Column>
                <Column prop="created_at" :label="$t('Created At')" width="200"> </Column>
                <Column prop="updated_at" :label="$t('Updated At')" width="200"> </Column>
                <Column align="center" :label="$t('Operate')" width="300">
                    <template #default="scope">
                        <a :href="'/admin/order/view?id=' + scope.item.id" style="margin-left:10px" class="link-primary decoration_none">{{$t('View')}}</a>
                        <a v-if="scope.item.status == 'WAIT_PAY'" :href="'/checkout?order_no=' + scope.item.order_no" style="margin-left:10px" class="link-primary decoration_none">{{$t('Pay')}}</a>
                        <!--
                        <a v-if="scope.item.status == 'DELIVERY'" href="#" style="margin-left:10px" class="link-primary decoration_none" @click.prevent="download_pdf">{{$t('Download PDF')}}</a>
                        -->
                        <a v-if="scope.item.status == 'DELIVERY'" target="_blank" :href="'/api/admin/order/download_pdf?token='+user_token+'&order_no=' + scope.item.order_no" style="margin-left:10px" class="link-primary decoration_none">{{$t('Download PDF')}}</a>
                    </template>
                </Column>
            </Table>

            <Pagination style="position:absolute; right:200px" :page="pagination.page"
                :page_total="pagination.page_total" v-on:jump="searchPage($event)" />
        </div>


    </VBox>



</template>

<script>
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

export default {
    data: function () {
        return {
            user_token:userStore.user.token,
            form_data: {
                title: '',
            },
            query: {
                page: 1,
                page_size: 10,
                title: '',
                order: "desc",
                order_by: "id",
            },
            pagination: {
                item_total: 3,
            },

            items: [],
        }
    },

    mounted: function () {
        this.searchPage(1);
    },
    methods: {

        searchSort: function (event) {

            this.query.order_by = event.prop
            if (event.order == "ascending") {
                this.query.order = "asc";
            }
            else {
                this.query.order = "desc";
            }

            console.log(event.order)
            console.log(event.prop)


            this.search()
        },

        searchPage: function (page) {
            this.query.page = page;
            this.search();
        },

        search: async function () {
            var response = await this.$api.admin_order_list(this.query)
            this.items = response.items;
            this.pagination = response.pagination;
        },

        /*
        download_pdf: function () {
            alert('download pdf')
        },
        */
    },
}
</script>
