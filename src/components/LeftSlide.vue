<template>
    <div>
        <!-- 遮罩层 -->
         <!--
        <div v-if="visible" class="overlay" @click="hide"></div>
        -->

        <!-- 侧边菜单 -->
        <transition name="slide">
        <nav class="side-menu" v-if="visible" @click.self="hide" :style="style">
            <div class="menu-content">
                <slot>
                    Left Content Slot
                </slot>
            </div>
        </nav>
        </transition>

    </div>
</template>

<script>
export default {
    props:{
        style:"",
    },
    data() {
        return {
            visible: false,
        };
    },
    created: function () {
    },
    methods: {
        show: function () {
            this.visible = true;
        },
        hide() {
            this.visible = false;
        },
    },
};
</script>

<style scoped>
/* 侧边菜单 */
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4); /* 半透明遮罩 */
  z-index: 1000;
}



/* 动画过渡 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.menu-content {
  width: 250px;
  height: 100%;
  background-color: white;
  padding: 2em 1em;
  box-shadow: 2px 0 5px rgba(0,0,0,0.3);
  position: relative;
}

</style>