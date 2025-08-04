<template>
 <div class="stepper" >
  <div class="steps-container">
    <div class="steps d-flex">
        <div v-for="(item, index) in items" :class="{ active: index === active_index }" 
          class="d-flex flex-row flex-grow-1">
            <span class="stepper-head-icon"> {{ index+1 }} </span>
            {{ item.label }}
            <div v-if="(index+1) < items.length " class="stepper-head-line" :class="{active:index === active_index}"></div>
        </div>
    </div>
  </div>
  <div class="stepper-content-container">
      <div class="stepper-content" v-for="(item, index) in items"  v-show="active_index == index">
        <template v-if="item.slots">
          <component :is="item.slots" :item="item" />
        </template>
      </div>
  </div>
</div>

</template>

<script>
export default{
  props:{
  },
  data:function(){
    return {
      active_index: 0,
      items: []
    }
  },

  created() {
    var r = this.$slots.default();

    for(let i in r) 
    {
      let node = {
        label: r[i].props.label ?? "Step DEFAULT",
        style: r[i].props.style ??'',
        slots: null,
      }

      if (r[i].children) {
        node["slots"] = r[i].children.default
      }
      this.items.push(node)
    }

    //console.log("ITEM",this.items[1])
  },
  methods:{
    to_next:function(){
      this.active_index+=1
      if ( (this.active_index + 1) > this.items.length) {
        
        this.active_index = this.items.length -1 

      }
    },
    to_prev:function(){
      this.active_index-=1

      if ( this.active_index  < 0) this.active_index = 0;
    }
  }

}
</script>

<style scoped>
.step {
  min-width:200px;

}

.stepper-head-icon {
  border-radius: 50%;
  background-color: #6d6d6d;
  color: white;
  width: 24px;
  display: inline-block;
  text-align: center;
  margin-right:10px;

}

.active .stepper-head-icon{
  background-color: #bcc6d9;
}

.stepper-head-line {
  min-width:100px;
  flex:1;
  border: solid thin #e6e3e3;
  height: 1px;
  align-self: center;
  margin-right:10px;
  margin-left:10px;
}

.active .stepper-head-line{
  flex:1;
  border: solid thin #bcc6d9;
  height: 1px;
  align-self: center;
}


</style>