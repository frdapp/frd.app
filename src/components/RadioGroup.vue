<template>

  <div>
      <div class="form-check form-check-radio form-check-inline" v-for="value in values" style="margin-top:7px;margin-bottom:0px;">
              <input v-if="value == modelValue" @change="OnUpdateModelValue" type="radio"  :name="name"  :value="value" checked /> 
              <input v-if="value != modelValue" @change="OnUpdateModelValue" type="radio"  :name="name"  :value="value" /> 
                &nbsp; {{value}} 
      </div>
  </div>


</template>
<script>
  export default {
    props: {
      name: String,
      values: {
        default: []

      },
      modelValue: String, 
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
      inputClass: {
        type: String,
        default: "",
      },
    },
    mounted:function(){
    },
    methods: {
      OnUpdateModelValue(event) {
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
