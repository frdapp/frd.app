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
                    <Input
                        @keyup.enter.native="searchPage(1)"
                        v-model="query.title"
                        type="text"
                        placeholder="标题/ID"
                        style="width:300px;"
                        />


                    <Button
                        style="margin-left:10px"
                        class="btn-primary"
                        @click="searchPage(1)" > 搜索 </Button>
        </HBox>
            </form>

            <!-- data -->
            <Table :items="items"
                    @sort-change="searchSort"
                    style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                    >
                <Column prop="id" label="ID" sortable="custom" width="100">
                        <template #default="scope">
                        <router-link target="_blank" :to="'/article/view?id='+scope.item.id" style="color:#606266">
                                {{scope.item.id}}
                        </router-link>
                        </template>
                </Column>
                <Column prop="username" label="username" > </Column>
                <Column prop="active" label="active" width="100"> </Column>
                <Column prop="created_at" label="创建时间" width="200"> </Column>
                <Column align="center" label="操作" width="300">
                    <template #default="scope">

                            <RouterLink :to="'/admin/post/view?id='+scope.item.id" target="_blank">
                                    查看
                            </RouterLink>

                        <a style="margin-left:10px" class="link-primary" @click="openEditDialog(scope.item.id)" >编辑</a>
                        <a style="margin-left:10px" class="link-danger" @click="openDeleteDialog(scope.item.id,scope.item.title)" >删除</a>
                        </template>
                </Column>
            </Table>

            <Pagination style="position:absolute; right:200px" :page="pagination.page" :page_total="pagination.page_total" v-on:jump="searchPage($event)" />


    </VBox>



</template>

<script>
export default {
    data: function(){
        return {
            form_data:{
                title:'',
            },
            query:{
                page:1,
                page_count:10,
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

    mounted:function(){
            this.searchPage(1);
    },
    methods:{
        openViewDialog:function(item_id){
            this.$router.push({ path: '/admin/blog/view', query: {"id":item_id }} ) ;
            return
        },

    openEditDialog:function(item_id){
            this.$router.push({ path: "/admin/post/update", query: {  "id":item_id}} ) ;

            return ;
    },
    openDeleteDialog:async function(id,title){
            let url="/api/admin/post/delete?id="+id
            var result = await this.$confirm("Delete It ?")
            if(result)
            {
                var response=await this.$api.admin_post_delete({"id":id})
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

            var self=this;

            var response=await this.$api.admin_log_list(this.query)
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
