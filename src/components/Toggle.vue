<template>
<div class="togglebutton">
	<label>
    	<input type="checkbox">
		Toggle is off
	</label>
</div>

</template>
<script>
  export default {
    props: {
      modelValue:String, 
      id: {
        type: String,
        default: "",
      },
      type: {
        type: String,
        default: "text",
      },
      label: {
        type: [String, Object],
        text: String,
        class: String,
        default: () => ({
          class: "",
        }),
      },
      value: {
        type: String,
        default: "",
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
      inputClass: {
        type: String,
        default: "",
      },
    },
    mounted:function(){
    },
    methods: {
      onInput(event) {
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
