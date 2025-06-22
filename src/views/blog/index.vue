<template>


<nav aria-label="Page navigation example">
<ul class="pagination pagination-primary">

<li class="page-item "  @click="to_page(this.page-1)">
<a class="page-link" href="javascript:;" tabindex="-1">
<i class="fa fa-angle-left"></i>
<span class="sr-only">P</span>
</a>
</li>

  <template v-for="page in pages">

<li class="page-item active"  v-if="page ==  this.page">


<a class="page-link" href="javascript:;">{{page }}</a>
</li>

<li class="page-item"  v-if = "page != this.page"  @click="to_page(page)">
<a class="page-link" href="javascript:;">{{page }}</a>
</li>



  </template>




<li class="page-item" @click="to_page(this.page + 1)">
<a class="page-link" href="javascript:;">
<i class="fa fa-angle-right"></i>
<span class="sr-only"> N </span>
</a>
</li>
</ul>
</nav>
</template>

<script>
export default {

methods:{
		max:function(a,b) {  if (a > b ) return a ;  return b },
		min:function(a,b) {  if (a < b ) return a ;  return b },

		to_page:function(page){ 
		
		alert("to page"  + page);

},


},
	data:function(){
		return {
			"page":4,
		"page_total":10,

			"pages":[],
		};
		},

		mounted:function(){

		  let start_page=  this.max(1, this.page-3);
		  let end_page = this.min(this.page_total,this.page+3);
		  
		  this.pages=[];
		  
//console.log(start_page);
//console.log(end_page);

		  for(var page = start_page; page <= end_page ; page ++)
		  {
		  this.pages.push(page);
		  }
		  
		  console.log(this.pages);

	}
}
</script>

