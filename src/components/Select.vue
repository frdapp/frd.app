<template>
    <select @change="onChange" class="form-control" :value="modelValue" style="min-width:100px">
      <slot>
        <option v-for="item in options" :value="item[value_key]">
            {{ item[label_key]}} 
        </option>
      </slot>
    </select>
</template>
<script>
  export default {
    props: {
      options:{
        default:[
          /*
          {
            "label":"apple",
            "value":"001",
          },
          {
            "label":"banana",
            "value":"002",
          },
          {
            "label":"pear",
            "value":"003",
          },
          */
        ]
      },
      modelValue: {
        default: "",
      },
      value_key: {
        default: "value",
      },
      label_key: {
        default: "label",
      },
      size: {
        type: String,
        default: "md",
      },
      error: {
        type: Boolean,
        default: false,
      },
      success: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
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
      onChange(event) {
        this.$emit('update:modelValue', event.target.value);
      },

      getClasses:function(size, success, error) {
        let sizeValue, isValidValue;

        sizeValue = size && `form-control-${size}`;

        if (error) {
          isValidValue = "is-invalid";
        } else if (success) {
          isValidValue = "is-valid";
        } else {
          isValidValue = "";
        }

        return `${sizeValue} ${isValidValue}`;
      }
    },
  };
</script>
