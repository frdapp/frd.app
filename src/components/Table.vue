<template>
      <table class="table">
        <thead>
          <tr>
            <th class="table-head" v-for="column in columns" :key="column.prop">

                  <!-- 检查是否有插槽函数 -->
                  <template v-if="column.label">
                    {{ column.label }}
                  </template>
                  <template v-else>
                    {{ column.prop }}
                  </template>

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
    items: [],
  },
  data() {
    return {
      headers: [],
      columns: []
    }
  },
  created() {
  },
  mounted() {
    //console.log("default",this.$slots.default().length)
    var r = this.$slots.default()
    //console.log("length",r.length)
    //console.log(r[0].props.prop) //id , domain 等

    //slotNodes.map(vnode => vnode.text || vnode.children || '').join('');

    //console.log(this.$slots.default)
    //console.log(r[1].children.default)
    //return


    for (let i in r) {
      let node = {
        prop: r[i].props.prop,
        label: r[i].props.label,
        //width: r[i].props.width ?? '',
        //align: r[i].props.align ??'left',
        style: r[i].props.style ??'',
        slots: null,
      }

      if (r[i].children) {
        node["slots"] = r[i].children.default
      }

      console.log(node)

      this.columns.push(node)
    }

    //console.log("columns",this.columns.length)

  },
  methods: {
    get_style:function(){

    }
  }
}
</script>
