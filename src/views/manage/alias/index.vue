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
                <Select v-model="query.user_id" @change="search()">
                    <option value="0" :label="$t('All Users')" />
                    <option v-for="user in users" :value="user.id" :label="user.email" />
                </Select>
                <Input @keyup.enter.native="searchPage(1)" v-model="query.query" type="text"
                    style="width:300px;margin-left:12px" />

                <Button style="margin-left:10px" class="btn-primary" @click="searchPage(1)">
                    {{ $t("Search") }}
                </Button>
            </HBox>
        </form>

        <!-- data -->
        <Table :items="items" @sort-change="searchSort" style="width: 100%;min-width:800px">
            <Column prop="address" :label="$t('Alias Email')" width="200"> </Column>
            <Column prop="goto" sortable="custom" :label="$t('Target Domain')" width=""> </Column>

            <Column prop="created_at" :label="$t('Created At')" width="200"> </Column>
            <Column prop="updated_at" :label="$t('Updated At')" width="200"> </Column>

        </Table>

        <Pagination style="align-self: flex-end;" :page="pagination.page" :page_total="pagination.page_total"
            v-on:jump="searchPage($event)" />


    </VBox>


</template>

<script>
export default {
    data: function () {
        return {
            users: [],
            query: {
                page: 1,
                page_size: 10,
                query: '',
                order: "desc",
                order_by: "id",
            },
            pagination: {
                item_total: 0,
            },

            items: [],
        }
    },
    created: async function () {
        var response = await this.$api.manage_user_list({ "page_size": 999 })
        this.users = response.items;

        this.searchPage(1);
    },

    methods: {

        openDeleteDialog: async function (id, title) {
            var result = await this.$confirm("Danger", "Delete It ?")
            if (result) {
                var response = await this.$api.admin_domain_delete({ "id": id })
                if (response != false) {
                    this.search()
                }
            }
        },

        openAddDialog: function () {
            this.$router.push({
                path: "/admin/alias/create",
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
            var response = await this.$api.manage_alias_list(this.query)
            this.items = response.items;
            this.pagination = response.pagination;
        },
    },
}
</script>
