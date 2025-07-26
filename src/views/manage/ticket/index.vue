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
        <HBox  style="  margin-top:10px;padding:0px;">
            <Select v-model="query.user_id" @change="search()">
                <option  value="0"  :label="$t('All Users')" />
                <option v-for="user in users" :value="user.id"  :label="user.email" />
            </Select>
                    <Input
                        @keyup.enter.native="searchPage(1)"
                        v-model="query.title"
                        type="text"
                        style="width:200px;margin-left:10px"
                        />


                    <Button
                        style="margin-left:10px"
                        class=""
                        @click="searchPage(1)" > {{$t("Search")}} </Button>
        </HBox>
            </form>

            <!-- data -->
            <div  style="margin-top:10px;padding:0px;width:100%">
                    <Table :items="items"
                            @sort-change="searchSort"
                            style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                            >
                        <Column prop="id" :label="$t('ID')" sortable="custom" width="100">
                                <template #default="scope">
                                        {{scope.item.id}}
                                </template>
                        </Column>
                        <Column prop="user_email" :label="$t('User Email')" > </Column>
                        <Column prop="title" :label="$t('Title')" > </Column>
                        <Column prop="description" sortable="custom" :label="$t('Description')" width="100"> </Column>
                        <Column prop="created_at" :label="$t('Created At')" width="200"> </Column>
                        <Column prop="created_at" :label="$t('Updated At')" width="200"> </Column>
                        <Column align="center" :label="$t('Opearate')" width="300">
                            <template #default="scope">

                                    <RouterLink :to="'/manage/ticket/view?id='+scope.item.id" class="decoration_none" target="_blank">
                                        {{$t('View')}}
                                    </RouterLink>
                                </template>
                        </Column>
                    </Table>

            <Pagination style="position:absolute; right:200px" :page="pagination.page" :page_total="pagination.page_total" v-on:jump="searchPage($event)" />
            </div>


    </VBox>




</template>

<script>
export default {
    data: function(){
        return {
            users:[],

            query:{
                user_id:0,
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
        }
    },

    created:async function(){
            var response=await this.$api.manage_user_list({"page_size":999})
            this.users=response.items;

            this.searchPage(1);
    },
    methods:{

    openEditDialog:function(item_id){
            this.$router.push({ path: "/admin/domain/update", query: {  "id":item_id}} ) ;

            return ;
    },
    openDeleteDialog:async function(id,title){
            var result = await this.$confirm("Delete It ?")
            if(result)
            {
                var response=await this.$api.admin_domain_delete({"id":id})
                if(response != false)
                {
                    this.search()
                }
            }
    },

    openAddDialog:function(){
       this.$router.push({
           path: "/admin/domain/create",
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
            var response=await this.$api.manage_ticket_list(this.query)
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
