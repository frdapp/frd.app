<template>
  <div class="tabs">
    <div class="tab-headers">
      <div v-for="(item, index) in items" :class="{ active: index === active_index }" @click="select_tab(index)"
        class="tab-header">
        {{ item.label }} 
      </div>
    </div>

    <div class="tab-contents">
      <div class="tab-content" v-for="(item, index) in items"  v-show="active_index == index">
        <template v-if="item.slots">
          <component :is="item.slots" :item="item" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
  },

  data() {
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
        label: r[i].props.label,
        style: r[i].props.style ??'',
        slots: null,
      }

      if (r[i].children) {
        node["slots"] = r[i].children.default
      }
      this.items.push(node)
    }

    console.log("ITEM",this.items[1])
  },
  methods: {
    select_tab(index) {
      this.active_index = index
    }
  }
}
</script>

<style scoped>
.tabs {
  border: 1px solid #ccc;
  font-family: sans-serif;
}

.tab-headers {
  display: flex;
  /* background: #eee; */
}

.tab-header {
  padding: 10px 15px;
  cursor: pointer;
}

.tab-header.active {
  background: #fff;
  font-weight: bold;
  border-bottom: 2px solid #42b983;
}

.tab-content {
  padding: 20px;
  background: #fff;
  border-top: 1px solid #ccc;
}
</style>
