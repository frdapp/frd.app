<script setup>
// Vue Material Kit 2 components
import PaginationItem from "@/components/PaginationItem.vue";
</script>
<template>
    <ul class="pagination" :class="getClasses(color, size)">
      <!--
          css: filter 颜色转换计算器
      https://www.zhangxinxu.com/sp/filter.html
      -->

      <PaginationItem @click=handleCurrentChange(1) label="first">
          <template #default="scope">
            First
          </template>
      </PaginationItem> 

      <PaginationItem @click=handleCurrentChange(page-1) label="prev" >
          <template #default="scope">
            Previous
          </template>
      </PaginationItem> 

      <PaginationItem  @click="handleCurrentChange(current_page)" v-for="current_page in pages" :label="current_page" :class="current_page == page ? 'active':''" />

      <PaginationItem @click=handleCurrentChange(page+1) label="">
          <template #default="scope">
            Next
          </template>
      </PaginationItem> 

      <PaginationItem @click=handleCurrentChange(page_total) label="" >
          <template #default="scope">
            Last
          </template>
      </PaginationItem> 



    </ul>
</template>

<script>
export default {
    props:{
        page: {
            type: [ Number],
            required: true,
            default:1
        },
        page_total:{
            type: [ Number],
            required: true,
            default:10
        },
        color: {
            type: String,
            default: "success",
        },
        size: {
            type: String,
            default: "",
        },
    },
    methods:{
        max:function(a,b) {  if (a > b ) return a ;  return b },
        min:function(a,b) {  if (a < b ) return a ;  return b },
        to_page:function(page){
            this.$emit("to_page",page)
        },
        render:function(){
          let page = parseInt(this.page)
          let page_total = parseInt(this.page_total)

          let start_page = this.max(1, page - 3);
          let end_page = this.min(page_total, page + 3);

          this.pages = [];


          for (var _page = start_page; _page <= end_page; _page++) {
            this.pages.push(parseInt(_page));
          }

        },
        handleSizeChange(val) {
        },
        handleCurrentChange(val) {
          if(val < 1) val =1
          if(val > this.page_total) val=this.page_total

          this.$emit('jump',val);
        },

        getClasses: function (color, size) {
            let colorValue, sizeValue;

            colorValue = this.color ? `pagination-${this.color}` : "";
            sizeValue = this.size ? `pagination-${this.size}` : "";

            return `${colorValue} ${sizeValue}`;
        }
    },
    data:function(){
        return {
            "page":parseInt(this.page),
            "page_total":parseInt(this.page_total),
            "pages":[],
        };
    },
    watch: {
        'page': function (val) {
            this.page= val.page;
            this.render()
        },
        'page_total': function (val) {
            this.page_total= val.page_total;
            this.render()
        },
    },
    mounted:function(){
      this.render()
      console.log(this.pages);
    }

}

</script>
