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
    <VBox style="width:100%;min-width:800px">
            <!-- data -->
            <Table :items="items" @sort-change="searchSort" >
                <Column prop="id" label="ID" sortable="custom" width="100"> 
                        <template #default="scope">
                                    {{scope.item.id}}
                        </template>
                </Column>
                <Column prop="email" label="Email" > </Column>
                <Column prop="amount" label="余额" > </Column>
                <Column prop="points" label="积分" > </Column>
                <Column prop="id" label="免费容量" width="100"> 
                        <template #default="scope">
                            {{scope.item.storage_free}} G
                        </template>
                </Column>
                <Column prop="id" label="当前容量" width="100"> 
                        <template #default="scope">
                            {{scope.item.storage_current}} G
                        </template>
                </Column>
                <Column prop="id" label="最大容量" width="100"> 
                        <template #default="scope">
                            {{scope.item.storage_max}} G
                        </template>
                </Column>
                <Column prop="created_at" label="创建时间" width="200"> </Column> 
                <Column prop="updated_at" label="修改时间" width="200"> </Column> 
                <Column  label="操作" style=""> 
                    <template #default="scope">
                        <a style="margin-left:10px" class="link-primary" @click="setStorageMax(scope.item.id,scope.item.storage_max)" >设置最大容量</a>
                    </template>
                </Column> 
            </Table>

            <Pagination style="align-self: flex-end;" :page="pagination.page" :page_total="pagination.page_total" v-on:jump="searchPage($event)" /> 

    </VBox>


</template>

<script>
export default {
    data: function () {
        return {
            query: {
                page: 1,
                page_size: 10,
                title: '',
                order: "desc",
                order_by: "id",
            },
            pagination: {
                item_total: 0,
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
            var response = await this.$api.admin_user_list(this.query)
            console.log(response)
            this.items = response.items;
            this.pagination = response.pagination;
        },
        setStorageMax: async function (id,storage_max) {
            var value=await this.$prompt("Storage Max",storage_max)

            await this.$api.admin_me_update_storage_max({"value":value})
            this.search()
        },

    },
}
</script>
