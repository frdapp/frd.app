<template>
    <div>
        <!-- 遮罩层 -->
        <div v-if="visible" class="overlay" @click="closeDrawer"></div>

        <!-- 底部弹出内容 -->
        <transition name="slide-up">
            <div v-if="visible" class="bottom-drawer">
                <slot>
                    Content
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
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
/* 遮罩层样式 */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

/* 底部弹出层样式 */
.bottom-drawer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    z-index: 100;
    padding: 20px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

/* 动画效果 */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}

/* 打开按钮 */
.open-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 16px;
    font-size: 16px;
}
</style>
