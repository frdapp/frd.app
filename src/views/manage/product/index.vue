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
        <div>
            <Button style="margin-right:50px" class="btn-success" @click="openAddDialog()">
                {{$t("Create")}}
            </Button>
        </div>

        <!--

        <form name="search" v-on:submit="searchPage(1)">
            <HBox style="  margin-top:10px;padding:0px;">
                <Input @keyup.enter.native="searchPage(1)" v-model="query.title" type="text" style="width:300px;" />

                <Button style="margin-left:10px" class="btn-primary" @click="searchPage(1)"> {{$t("Search")}} </Button>
            </HBox>
        </form>
    -->

        <!-- data -->
        <div style="margin-top:10px;padding:0px;width:100%">
            <Table :items="items" @sort-change="searchSort" style="width: 100%"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <Column prop="id" :label="$t('ID')" sortable="custom" width="100">
                    <template #default="scope">
                        {{ scope.item.id }}
                    </template>
                </Column>
                <Column prop="product_type" :label="$t('Product Type')"></Column>
                <Column prop="title" :label="$t('Title')">
                </Column>
                <Column prop="description" :label="$t('Description')" width="100"> </Column>
                <Column prop="storage" :label="$t('Storage')" width="100"> </Column>
                <Column prop="duration" :label="$t('duration')" width="100"> </Column>
                <Column prop="price" :label="$t('price')" width="100"> </Column>
                <Column prop="points" :label="$t('points')" width="100"> </Column>
                <Column prop="stock" :label="$t('stock')" width="100"> </Column>
                <Column prop="is_active" :label="$t('is_active')" width="100"> </Column>
                <Column prop="created_at" :label="$t('Created At')" width="200"> </Column>
                <Column prop="updated_at" :label="$t('Updated At')" width="200"> </Column>
                <Column align="center" :label="$t('Operate')" width="300">
                    <template #default="scope">
                        <a :href="'/manage/product/update?id=' + scope.item.id" style="margin-left:10px"
                            class="link-primary decoration_none">{{$t("Edit")}}</a>
                        <a v-if="scope.item.is_active == 1" href="#" style="margin-left:10px" class="link-primary decoration_none"
                            @click="active_product(scope.item.id)">{{$t("Active")}}</a>
                        <a v-if="scope.item.is_active == 0" href="#" style="margin-left:10px" class="link-primary decoration_none"
                            @click="inactive_product(scope.item.id)">{{$t("Inactive")}}</a>
                    </template>
                </Column>
            </Table>

            <Pagination style="position:absolute; right:200px" :page="pagination.page"
                :page_total="pagination.page_total" v-on:jump="searchPage($event)" />
        </div>


    </VBox>



</template>

<script>
export default {
    data: function () {
        return {
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
                item_total: 1,
            },

            items: [],
        }
    },

    mounted: function () {
        this.searchPage(1);
    },
    methods: {

        active_product: async function (id) {
            var result = await this.$confirm("Warning","Active It ?")
            if (result) {
                var response = await this.$api.manage_product_set_active({ "id": id ,"is_active":1})
                if (response != false) {
                    this.search()
                }
            }
        },
        inactive_product: async function (id) {
            var result = await this.$confirm("Warning","Deactive It ?")
            if (result) {
                var response = await this.$api.manage_product_set_active({ "id": id ,"is_active":0})
                if (response != false) {
                    this.search()
                }
            }
        },


        openAddDialog: function () {
            this.$router.push({
                path: "/manage/product/create",
                query: {}
            });
            return;
        },


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
            var response = await this.$api.manage_product_list(this.query)
            this.items = response.items;
            this.pagination = response.pagination;
        },
    },
}
</script>
