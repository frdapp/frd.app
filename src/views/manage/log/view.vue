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
            <div  style="margin-top:10px;padding:0px;width:100%">
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
                        <Column prop="domain" label="Domain" > </Column>
                        <Column prop="description" sortable="custom" label="Description" width="100"> </Column>
                        <Column prop="created_at" label="创建时间" width="200"> </Column>
                        <Column align="center" label="操作" width="300">
                            <template #default="scope">

                                <a style="margin-left:10px" class="link-primary" @click="openEditDialog(scope.item.id)" >编辑</a>
                                <a style="margin-left:10px" class="link-danger" @click="openDeleteDialog(scope.item.id,scope.item.title)" >删除</a>
                                </template>
                        </Column>
                    </Table>

            <Pagination style="position:absolute; right:200px" :page="pagination.page" :page_total="pagination.page_total" v-on:jump="searchPage($event)" />
            </div>


    </VBox>



<!--
        <el-dialog title="文章" v-model="dialogFormVisible">
          <Form ref='addform' :form_data="form_data" @dialog_cancel='dialogFormVisible=false' @dialog_success="dialogFormVisible=false; search()"></Form>
        </el-dialog>

        <el-dialog title=""  v-model="dialogViewFormVisible">
          <FormView ref='viewform' :form_data="form_data" />
        </el-dialog>

        <el-dialog title="文章" v-model="dialogEditFormVisible">
          <Form ref='editform' :form_data="form_data" @dialog_cancel='dialogEditFormVisible=false' @dialog_success="dialogEditFormVisible=false; search()"></Form>
        </el-dialog>
        -->

</template>

<script>
export default {
    data: function(){
        return {
            dialogFormVisible:false,
            dialogEditFormVisible:false,
            dialogViewFormVisible:false,

            permissions:[
                {
                "value":"",
                "label":"全部",
            },
                {
                "value":"SHARE",
                "label":"分享",
            },
                {
                "value":"PUBLIC",
                "label":"公开",
            },
                {
                "value":"PRIVATE",
                "label":"私有",
            }
        ],

            form_data:{
                title:'',
            },
            query:{
                page:1,
                page_count:10,
                title:'',
                order:"desc",
                order_by:"id",
                permission:'',
                tags:[],
                tag_string:'',
            },
            pagination:{
                item_total:3,
            },

            items:[],
        }
    },

    mounted:function(){
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
            var response=await this.$api.admin_domain_list(this.query)
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
