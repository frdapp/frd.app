<template>
    <button type="button" class="btn btn-primary" :disabled="localDisabled">
        <slot>Button</slot>
    </button>
</template>

<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        created:function(){

        },
        data:function(){
            return {
                localDisabled: this.disabled
            }
        },
        methods: {
            is_disabled:function(){
                return this.localDisabled == true
            },
            disable:function() {
                this.localDisabled=true
            },
            enable:function() {

                this.localDisabled=false
            }

        }
    }

</script>
