<template>
  <table class="table">
    <thead>
      <tr>

        <th class="table-head" v-for="column in columns" :key="column.prop" @click="on_column_click(column.prop,sorts[column.prop])">
            <!-- 检查是否有插槽函数 -->
            <template v-if="column.label">
              {{ column.label }}
            </template>
            <template v-else>
              {{ column.prop }}
            </template>

            <span v-if="column.prop in sorts && sorts[column.prop] == 'desc'" style="cursor:pointer"> 
              ↑ 
               <span style="color:#cccccc">
               ↓
               </span>
            </span>
            <span v-if="column.prop in sorts && sorts[column.prop] == 'asc'" style="cursor:pointer">
               <span style="color:#cccccc">
              ↑ 
               </span>
              ↓
            </span>
            <span v-if="column.prop in sorts && sorts[column.prop] == ''" style="color:#cccccc;cursor:pointer">
              ↑
               ↓
            </span>

            <!--
            {{ item[column.prop] }}
            &nbsp;
            <span v-if="column.sort == 'asc'" style="right:8px">▲</span>
            <span v-if="column.sort == 'desc'" style="right:8px">▼</span>
            -->
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="column in columns" :key="column.prop" :style="column.style">
          <!-- 检查是否有插槽函数 -->
          <template v-if="column.slots">
            <!-- 调用插槽函数并传递作用域参数 -->
            <component :is="column.slots" :item="item" />
          </template>
          <template v-else>
            {{ item[column.prop] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    items: Array,
    sorts: {
      type:Object,
      default:{},

    },
  },
  data() {
    return {
      headers: new Array(),
      columns: new Array(),
    }
  },
  created() {
    console.log("sorts",this.sorts)
  },
  mounted() {
    var r = this.$slots.default()

    for (let i in r) {
      let node = {
        prop: r[i].props.prop,
        label: r[i].props.label,
        style: r[i].props.style ??'',
        //sortable: r[i].props.sortable ??false,
        //sortorder: r[i].props.order ?? '',
        sort_changed: r[i].props._changedsort ?? null,
        slots: null,
      }

      if (r[i].children) {
        node["slots"] = r[i].children.default
      }

      console.log(node)

      this.columns.push(node)
    }
  },
  methods: {
    get_style:function(){

    },
    on_column_click:function(field,order){
      var sorts = this.sorts

      for (var key in sorts) {
        sorts[key] = ""
      }

      if (order == "") {
        sorts[field] = "asc"
      }
      else if (order == "asc") {
        sorts[field] = "desc"
      }
      else if (order == "desc") {
        sorts[field] = "asc"
      }

      this.$emit("sort_change", sorts)
    }
  }
}
</script>
