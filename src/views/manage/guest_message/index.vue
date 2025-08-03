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

        <!-- data -->
        <div style="margin-top:10px;padding:0px;width:100%">
            <Table :items="items" @sort-change="searchSort" style="width: 100%"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <Column prop="id" :label="$t('ID')" sortable="custom" width="100">
                    <template #default="scope">
                        {{ scope.item.id }}
                    </template>
                </Column>
                <Column prop="subject" :label="$t('Subject')">
                </Column>
                <Column prop="message" :label="$t('Message')" width="100"> </Column>
                <Column prop="name" :label="$t('Guest Name')" width="100"> </Column>
                <Column prop="email" :label="$t('Guest Email')" width="100"> </Column>
                <Column prop="created_at" :label="$t('Created At')" width="200"> </Column>
                <Column prop="updated_at" :label="$t('Updated At')" width="200"> </Column>
                <Column align="center" :label="$t('Operate')" width="300">
                    <template #default="scope">
                        <a href="#" style="margin-left:10px" class="link-danger decoration_none"
                            @click="openDeleteDialog(scope.item.id)">{{$t("Delete")}}</a>
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

        openDeleteDialog: async function (id) {
            var result = await this.$confirm("Danger","Delete It ?")
            if (result) {
                var response = await this.$api.manage_guest_message_delete({ "id": id })
                if (response != false) {
                    this.search()
                }
            }
        },

        openAddDialog: function () {
            this.$router.push({
                path: "/manage/guest_message/create",
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

            this.search()
        },

        searchPage: function (page) {
            this.query.page = page;
            this.search();
        },

        search: async function () {
            var response = await this.$api.manage_guest_message_list(this.query)
            this.items = response.items;
            this.pagination = response.pagination;
        },
    },
}
</script>
