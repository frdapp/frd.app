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
        <!--
        <div>
            <Button style="margin-right:50px" class="btn-success"  @click="openAddDialog()" >
                新增
            </Button>
        </div>
        -->

        <form name="search" v-on:submit="searchPage(1)">
        <HBox  style="  margin-top:10px;padding:0px;">
                    <Input
                        @keyup.enter.native="searchPage(1)"
                        v-model="query.email"
                        type="text"
                        style="width:300px;"
                        />

                    <Button
                        style="margin-left:10px"
                        class="btn-primary"
                        @click="searchPage(1)" > {{ $t('Search') }} </Button>
        </HBox>
            </form>

            <!-- data -->
                    <Table :items="items"
                            @sort-change="searchSort"
                            style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                            >
                        <Column prop="id" :label="$t('ID')" sortable="custom" width="100">
                                <template #default="scope">
                                        {{scope.item.id}}
                                </template>
                        </Column>
                        <Column prop="email" :label="$t('Username')" > </Column>
                        <Column prop="points" :label="$t('Points')" > </Column>
                        <Column prop="storage_current"  :label="$t('Storage Current')" width="100"> </Column>
                        <Column prop="is_verified"  :label="$t('Is Verified')" width="100"> </Column>
                        <Column prop="created_at" :label="$t('Created At')" width="200"> </Column>
                        <Column prop="updated_at" :label="$t('Updated At')" width="200"> </Column>
                        <Column align="center" :label="$t('Operate')" width="300">
                            <template #default="scope">
                                <a href="#" style="margin-left:10px" class="link-primary decoration_none" @click="add_points(scope.item.id)" >{{$t('Give Points')}}</a>
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
                email:'',
                order:"desc",
                order_by:"id",
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

        add_points: async function (user_id) {
            var value = await this.$prompt("Give Point")
            if(value == false) return false;

            var params = {
                "id":user_id,
                "points":value
            }

            var response = await this.$api.manage_user_add_points(params)
            if (response == false) return false

            this.search()

            return;
        },
    openDeleteDialog:async function(id,title){
            var result = await this.$confirm("Delete It ?")
            if(result)
            {
                var response=await this.$api.manage_user_delete({"id":id})
                if(response != false)
                {
                    this.search()
                }
            }
    },

    openAddDialog:function(){
       this.$router.push({
           path: "/manage/user/create",
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

            this.search()
        },

        searchPage:function(page){
            //alert(this.$t("test")) translate in js
            this.query.page=page;
            this.search();
        },

        search:async function(){
            var response=await this.$api.manage_user_list(this.query)
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
