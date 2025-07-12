<template>
    <transition name="alert-fade">
        <div class="custom-alert-overlay">
            <div class="card fade custom-alert show"  :style="style">
                <div class="card-header">
                    <strong style="font-size:16px" :class="title_class">{{ title }}</strong>
                </div>
                <div class="card-body">
                    <p class="" styel="color:#dc8427">
                        {{ message }}
                    </p>
                </div>
                <div class="card-footer justify-content-end">
                    <a class="link-primary" aria-label="ok" @click="ok">
                        OK
                    </a>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    props: {
        title:"INFO",
        message:"Message",
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
        this.title_class="text-"+this.title.toLowerCase()
    },
    methods:{
        show:function() {
            return new Promise((resolve) => {
                this.resolver = resolve
           })
        },
        ok:function() {
            if (this.resolver) {
                this.resolver(true) // 触发 resolve
                this.resolver = null

                this.destroyElement()
            }
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
  top: 20%;
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

/* 可选：简单淡入动画 */
@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>