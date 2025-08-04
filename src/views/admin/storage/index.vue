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
                        {{$t("Current Storage") }} {{ storage_current }} GB
                        <a href="/admin/storage/buy">{{ $t("Buy Storage") }}</a>
        <HBox  style="  margin-top:10px;padding:0px;">
                    <Input
                        @keyup.enter.native="searchPage(1)"
                        v-model="query.query"
                        type="text"
                        placeholder=""
                        class=""
                        style="width:300px;"
                        />
                    <Button
                        style="margin-left:10px"
                        class="btn-primary"
                        @click="searchPage(1)" > {{$t("Search")}} </Button>

        </HBox>
            </form>

            <!-- data -->
                    <Table :items="items"
                            @sort-change="searchSort"
                            style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                            >

                        <Column prop="title" :label="$t('Title')" > </Column>
                        <Column prop="description" :label="$t('Description')" width="100"> </Column>
                        <Column prop="size" :label="$t('Size')" > </Column>
                        <Column prop="start_at" :label="$t('Start At')"> </Column>
                        <Column prop="expired_at" :label="$t('Expired At')"> </Column>
                        <Column prop="state" :label="$t('State')"> </Column>
                        <Column prop="created_at" :label="$t('Created At')" width="200"> </Column>
                        <Column prop="updated_at" :label="$t('Updated At')" width="200"> </Column> 

                    </Table>

            <Pagination style="align-self:flex-end" :page="pagination.page" :page_total="pagination.page_total" v-on:jump="searchPage($event)" />


    </VBox>


</template>

<script>
export default {
    data: function(){
        return {
            query:{
                page:1,
                page_size:10,
                query:'',
                order:"desc",
                order_by:"id",
            },
            pagination:{
                item_total:0,
            },
            items:[],
            storage_current:0,
        }
    },

    mounted:function(){
            this.searchPage(1);
    },
    methods:{
        searchSort:function(event){

            this.query.order_by=event.prop
            if(event.order == "ascending")
            {
                this.query.order="asc";
            }
            else
            {
                this.query.order="desc";
            }

            console.log(event.order)
            console.log(event.prop)


            this.search()
        },

        searchPage:function(page){
            this.query.page=page;
            this.search();
        },

        search:async function(){
            var response=await this.$api.admin_storage_list(this.query)
            this.items=response.items;
            this.pagination=response.pagination;
            this.storage_current=response.storage_current;
        },
    },
}
</script>
<style scoped>


</style>