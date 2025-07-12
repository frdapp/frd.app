<template>
    <transition name="alert-fade">
        <div  class="custom-alert-overlay">
            <div  class="card fade custom-alert show" role="alert">
                <div class="card-header">
                    <strong class="link-primary" style="font-size:16px">{{ message }}</strong>
                </div>

                <div class="card-body">

                    <Input ref="myInput" v-model="localValue" style="width:100%" />
                </div>
                <div class="card-footer justify-content-end">
                    <a class="link-primary" @click="ok">Ok</a>
                    <a class="link-secondary" @click="cancel" style="padding-left:10px">Cancel</a>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import Button from "@/components/Button.vue"
import Input from "@/components/Input.vue"

export default {
    components: {
        Button,
        Input,
    },
    props: {
        message: "",
        value: "",
        handleClose:null
    },
    data: function () {
        return {
            localValue: this.value,
            resolver: null,
        }

    },

    methods: {
        show: function ($event) {
            return new Promise((resolve) => {
                //wait resolver(xxx) ,then really return 
                this.resolver = resolve
            })
        },
        ok: function ($event) {
            if (this.resolver) {
                this.resolver(this.localValue) // 触发 resolve
                this.resolver = null
            }
        },
        cancel: function ($event) {
            if (this.resolver) {
                this.resolver("") // 触发 resolve
                this.resolver = null
            }
        },
    },
    mounted: function () {
        //console.log(this.$refs.myInput)
        this.$refs.myInput.focus()
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