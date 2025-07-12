<template>

 <div :class="flexClass" :style="flexStyle">
    <slot></slot>
  </div>

</template>

<script>
export default{
  props: {
    direction: {
      type: String,
      default: "row", // 方向: row | column
      validator: (val) => ["row", "column", "row-reverse", "column-reverse"].includes(val),
    },
    justify: {
      type: String,
      default: "flex-start", // 主轴对齐
      validator: (val) =>
        ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"].includes(val),
    },
    align: {
      type: String,
      default: "stretch", // 交叉轴对齐
      validator: (val) =>
        ["stretch", "flex-start", "flex-end", "center", "baseline"].includes(val),
    },
    wrap: {
      type: String,
      default: "nowrap", // 是否换行
      validator: (val) => ["nowrap", "wrap", "wrap-reverse"].includes(val),
    },
    gap: {
      type: [String, Number],
      default: 0, // 间距
    },
  },
  computed: {
    flexClass() {
      return ["flex-container"];
    },
    flexStyle() {
      return {
        display: "flex",
        flexDirection: this.direction,
        justifyContent: this.justify,
        alignItems: this.align,
        flexWrap: this.wrap,
        gap: typeof this.gap === "number" ? `${this.gap}px` : this.gap,
      };
    },
  },
};
</script>

<style scoped>

.hbox {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: flex-start;
    flex-wrap: nowrap;
}
</style>