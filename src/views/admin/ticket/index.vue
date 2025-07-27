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
            <Button style="margin-right:50px" class="btn-success"  @click="openAddDialog()" >
                {{ $t('Create')}}
            </Button>
        </div>

        <form name="search" v-on:submit="searchPage(1)">
        <HBox  style="  margin-top:10px;padding:0px;">
                    <Input
                        @keyup.enter.native="searchPage(1)"
                        v-model="query.title"
                        type="text"
                        style="width:300px;"
                        />


                    <Button
                        style="margin-left:10px"
                        class="btn-primary"
                        @click="searchPage(1)" > {{ $t('Search')}}</Button>
        </HBox>
            </form>

            <!-- data -->
                    <Table :items="items"
                            @sort-change="searchSort"
                            >
                        <Column prop="title" :label="$t('Title')" > </Column>
                        <Column prop="description" :label="$t('Description')" > </Column>
                        <Column prop="created_at" :label="$t('Created At')" width="200"> </Column>
                        <Column prop="updated_at" :label="$t('Updated At')" width="200"> </Column>
                        <Column align="center" :label="$t('Operate')" width="300">
                            <template #default="scope">

                                    <RouterLink :to="'/admin/ticket/view?id='+scope.item.id" class="decoration_none" target="_blank">
                                        {{$t('View')}}
                                    </RouterLink>
                            </template>
                        </Column>
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
                title:'',
                order:"desc",
                order_by:"id",
            },
            pagination:{
                item_total:0,
            },

            items:[],
        }
    },

    created:function(){
            this.searchPage(1);
    },
    methods:{
        openViewDialog:function(item_id){
            this.$router.push({ path: '/admin/blog/view', query: {"id":item_id }} ) ;
            return
        },

    openEditDialog:function(item_id){
            this.$router.push({ path: "/admin/ticket/update", query: {  "id":item_id}} ) ;

            return ;
    },
    openDeleteDialog:async function(id,title){
            var result = await this.$confirm("Delete It ?")
            if(result)
            {
                var response=await this.$api.admin_ticket_delete({"id":id})
                if(response != false)
                {
                    this.search()
                }
            }
    },

    openAddDialog:function(){
       this.$router.push({
           path: "/admin/ticket/create",
           query: {  }
       }) ;
       return ;
    },


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

            var self=this;


            var response=await this.$api.admin_ticket_list(this.query)
            this.items=response.items;
            this.pagination=response.pagination;
        },
        toUrl:function(path,params){
            if(params)
            {
                this.$router.push({ path: path,query:params})
            }
            else
            {
                this.$router.push({ path: path})
            }
        },

    },
}
</script>
