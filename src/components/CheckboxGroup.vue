<template>

    <div class="form-check form-check-radio form-check-inline" v-for="value in values">
            <input @change="onModelValueUpdate" v-if="choosed.includes(value)" class="" type="checkbox"  checked :name="name"  :value="value"/> 
            <input @change="onModelValueUpdate" v-else class="" type="checkbox"   :name="name"  :value="value" /> 
            &nbsp; 
            {{value}} 
    </div>


</template>
<script>
  export default {
    props: {
      name: String,
      values: {
        default: []

      },
      modelValue: {
                type:Array,
                default:[],
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
    created:function(){
    },
    mounted:function(){
    },
    data:function(){
        return {
                choosed:this.modelValue,
        }
    },
    methods: {
      onModelValueUpdate(event) {
                let value=event.target.value
                if(event.target.checked )
                {
                    if (!this.choosed.includes(value)) {
                        this.choosed.push(value)
                    }
                }
                else
                {
                    const index = this.choosed.indexOf(value)
                    if (index !== -1) {
                        this.choosed.splice(index, 1)
                    }

                }

                this.$emit('update:modelValue', this.choosed)
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
