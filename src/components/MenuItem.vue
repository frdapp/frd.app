<template>

    <div :path="path" 
    class="menu-item" 
    :class="localActive ?'menu-item-active':''" 
    @click.prevent="navigate">
        <slot>{{label}}</slot>
    </div>

</template>

<script>
    export default{
        props: {
            path: {
                type: String,
            },
            current_path: {
                type: String,
                default:"",
            },
            label: {
                type: String,
            },
            active:{
                type:String,
                default:"false",
            }
        },
        data:function(){
            return {
                //change string to  boolean
                localActive: this.current_path == this.path  ?  true : false
            }
        },
        created:function(){
        },
        methods:{
            navigate:function(){
                history.pushState({}, '', this.path)
                window.dispatchEvent(new Event('popstate'))
            },
            is_active:function(){
                return this.localActive == true
            },
            set_active:function(value){
                this.localActive=value
            },
        }

    };
</script>

<style scoped>

</style>
