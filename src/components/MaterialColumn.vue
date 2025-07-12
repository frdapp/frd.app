<template>
</template>

<script>
export default {
    props: {
    },
    data() {
        return{
        }
    },
    updated() {
      //this.totalTabs = this.$parent.$children.length // 获取到页面中一共传入几个TabItem
    },
    mounted() {

        console.log("slots", this.$slots)

        //let allSlots = this.$slots.default
        //console.log("length",allSlots.length)
    },
    watch: {
      totalTabs() {
        //bus.$emit('slot-changes') // 只要html的Tab中传入的TabItem发生变化，就会触发‘slot-changes’方法
      }
    }
}
</script>
