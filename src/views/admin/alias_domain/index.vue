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
                {{$t("Create")}}
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
                        @click="searchPage(1)" > 
                        {{$t("Search")}}
                </Button>
        </HBox>
            </form>

            <!-- data -->
            <Table :items="items" 
                    @sort-change="searchSort"
                    style="width: 100%;min-width:800px"
                    >
                <Column prop="alias_domain" :label="$t('Alias Domain')" width="200"> </Column>
                <Column prop="target_domain" sortable="custom" :label="$t('Target Domain')" width=""> </Column>

                <Column prop="created_at" :label="$t('Created At')" width="200"> </Column> 
                <Column prop="updated_at" :label="$t('Updated At')" width="200"> </Column> 
                <Column  :label="$t('Operate')" style="width:300px"> 
                    <template #default="scope">
                
                        <a :href="'/admin/alias_domain/update?id='+scope.item.id"  style="margin-left:0px" class="link-primary decoration_none" >{{$t("Edit")}}</a>
                        <a href="#" style="margin-left:10px" class="link-danger decoration_none" @click="openDeleteDialog(scope.item.id,scope.item.title)" >{{$t("Delete")}}</a>
                        </template>
                </Column> 
            </Table>

            <Pagination style="align-self: flex-end;" :page="pagination.page" :page_total="pagination.page_total" v-on:jump="searchPage($event)" /> 


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
        }
    },

    mounted:function(){
            this.searchPage(1);
    },
    methods:{

    openDeleteDialog:async function(id,title){
            var result = await this.$confirm("Danger",this.$t("Delete It ?"))
            if(result)
            {
                var response=await this.$api.admin_alias_domain_delete({"id":id})
                if(response != false)
                {
                    this.search()
                }
            }
    },

    openAddDialog:function(){
       this.$router.push({ 
           path: "/admin/alias_domain/create", 
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
            this.query.page=page;
            this.search();
        },

        search:async function(){
            var response=await this.$api.admin_alias_domain_list(this.query)
            this.items=response.items;
            this.pagination=response.pagination;
        },
    },
}
</script>
