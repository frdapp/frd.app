<template>
    <option :value="value">
      <slot>
        {{ label }}
      </slot>
    </option>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        default: "",
      },
      label: {
        type: String,
        default: "",
      },
    },
    data:function(){
      return {
      }
    },
    created:function(){

    },
    mounted:function(){
    },
    methods: {
    },
  };
</script>
