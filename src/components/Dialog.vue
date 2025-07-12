
<template>
    <transition name="alert-fade">
        <div class="custom-alert-overlay">
            <div class="card fade custom-alert show" >
                    <component v-if="component" :is="component" @finished="finished" />
            </div>
        </div>
    </transition>
</template>


<script>
import  Button from "@/components/Button.vue"

export default {
    components:{
        Button
    },
    props: {
        component:null,
        handleClose:null
    },
    data:function(){
        return {
            resolver:null,
        }
    },

    methods:{
        show:function($event) {
            return new Promise((resolve) => {
                this.resolver = resolve
           })
        },
        finished:function(params)
        {
            this.resolver(params)
            this.resolver = null
        },
        destroyElement() {
            this.handleClose && this.handleClose()
        }
    },
    mounted:function(){
    }
}
</script>

<style scoped>

/* 自定义 Alert 居中样式 */
.custom-alert {
  position: fixed;
  width: 40%;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1050;
  display: block;
  /* 默认隐藏 */
  min-width: 300px;
}

.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色遮罩 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>