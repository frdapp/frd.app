<template>
  <div class="togglebutton">
    <label>
      <input v-if="modelValue == true"  type="checkbox" checked="" >
      <input v-else type="checkbox">
        <span class="toggle" @click="on_toggle" ></span>
    </label>
</div>

</template>
<script>
  export default {
    props: {
      modelValue:Boolean, 
    },
    mounted:function(){
    },
    methods: {
      on_toggle(event) {
        if (this.modelValue == true) {

          this.$emit('update:modelValue', false)
        }
        else
        {
          this.$emit('update:modelValue', true)
        }
      },
    },
  };
</script>
