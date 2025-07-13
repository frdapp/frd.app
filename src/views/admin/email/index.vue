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
                新增
            </Button>
        </div>

        <form name="search" v-on:submit="searchPage(1)">
        <HBox  style="  margin-top:10px;padding:0px;">
                    <Input
                        @keyup.enter.native="searchPage(1)"
                        v-model="query.query"
                        type="text"
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
                                        {{scope.item.id}}
                                </template>
                        </Column>
                        <Column prop="username" label="Email" > </Column>
                        <Column prop="storage" label="Storage" width="100">
                                <template #default="scope">
                                    10G
                                </template>
                        </Column>
                        <Column prop="active" label="Active" width="100"> </Column>
                        <Column prop="created_at" label="创建时间" width="200"> </Column>
                        <Column prop="updated_at" label="修改时间" width="200"> </Column> 
                        <Column align="center" label="操作" width="300">
                            <template #default="scope">

                                <a style="margin-left:0px" class="link-primary" @click="updatePassword(scope.item.id)" >编辑密码</a>
                                <a style="margin-left:10px" class="link-danger" @click="openDeleteDialog(scope.item.id,scope.item.title)" >删除</a>
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
            form_data:{
                title:'',
            },
            query:{
                page:1,
                page_size:10,
                query:"",
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
        updatePassword: async function (id) {
            var value=await this.$prompt("New Password","")
            await this.$api.admin_email_update_password({"id":id,"password":value})
            this.search()
        },

    openDeleteDialog:async function(id,title){
            var result = await this.$confirm("Delete It ?")
            if(result)
            {
                var response=await this.$api.admin_email_delete({"id":id})
                if(response != false)
                {
                    this.search()
                }
            }
    },

    openAddDialog: function () {
        this.$router.push({
            path: "/admin/email/create",
            query: {}
        });
        return;
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

            var response=await this.$api.admin_email_list(this.query)
            this.items=response.items;
            this.pagination=response.pagination;
        },
    },
}
</script>
