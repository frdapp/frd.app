<template>
    <transition name="alert-fade">
        <div  class="custom-alert-overlay">
            <div class="card fade custom-alert show"  :style="style">
                <div class="card-header alert" :class="title_class">
                        {{ title }}
                </div>
                <div class="card-body">
                    <p class="" styel="color:#dc8427">
                        {{ message }}
                    </p>
                </div>
                <div class="card-footer justify-content-end">
                    <button class="btn btn-primary" aria-label="ok" @click="ok">
                        OK
                    </button>
                    <button  class="btn btn-secondary" aria-label="cancel" @click="cancel" style="margin-left:1em">
                        Cancel
                    </button>
                    <!--
                    <a href="#" class="decoration_none link-primary" aria-label="ok" @click="ok">
                        OK
                    </a>
                    <a href="#" class="decoration_none link-secondary" aria-label="cancel" @click="cancel" style="padding-left:10px">
                        Cancel
                    </a>
                    -->
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    props: {
        title:"INFO", //info,warning,success,error
        message:"Are you sure ?",
        style:"",
        handleClose:null
    },
    data:function(){
        return {
            resolver:null,
            title_class:"",
        }

    },
    created:function(){
        this.title_class="alert-"+this.title.toLowerCase()
    },
    methods:{
        show:function($event) {
            return new Promise((resolve) => {
                //wait resolver(xxx) ,then really return 
                this.resolver = resolve
           })
        },
        ok:function($event) {
            if (this.resolver) {
                this.resolver(true) // 触发 resolve
                this.resolver = null
            }
        },
        cancel:function($event) {
            if (this.resolver) {
                this.resolver(false) // 触发 resolve
                this.resolver = null
            }
        },
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