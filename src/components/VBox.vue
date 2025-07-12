<template>

  <div class="vbox" style="">
    <slot></slot>
  </div>

</template>

<script>
export default{


}
</script>

<style scoped>

.vbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: nowrap;
}
</style>