<template>
    <transition name="alert-fade">

        <div class="modal" tabindex="-1" v-show="is_show">
            <div class="modal-dialog">
                <div class="modal-content">
                    <slot name="header">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ title }}</h5>
                            <button @click="on_close" type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                    </slot>

                    <slot>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                    </slot>
                    <slot name="footer">
                            <!--
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                            -->
                    </slot>

                </div>
            </div>
        </div>

    </transition>
</template>


<script>
export default {
    props: {
        title:"",
        style:"",
        on_finished:Function
    },
    data:function(){
        return {
            is_show:false,
            //resolver:null,
            //title_class:"",
        }

    },
    created:function(){
    },
    methods:{
        show:function() {
            this.is_show=true;
        },
        hide:function() {
            this.is_show=false;
        },
        on_close:function() {
            this.is_show=false

            if (this.on_finished) 
            {
                this.on_finished()
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