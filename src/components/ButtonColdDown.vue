<template>
  <button class="btn" :disabled="isDisabled" @click="handleClick">
    <span v-if="isDisabled">{{ countdown }}</span>
    <slot v-else>
    </slot>
  </button>
</template>

<script>
export default {
  name: 'CountdownButton',
  props: {
    duration: {
      type: Number,
      default: 30 // 倒计时秒数，可配置
    },
    label_wait:""
  },
  data() {
    return {
      countdown: this.duration,
      isDisabled: false,
      timer: null
    }
  },
  methods: {
    handleClick(event) {
      if (this.isDisabled) return

      // 触发外部 click 事件
      this.$emit('click', event)

      // 开始倒计时
      this.startCountdown()
    },
    startCountdown() {
      this.isDisabled = true
      this.countdown = this.duration

      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          clearInterval(this.timer)
          this.isDisabled = false
        }
      }, 1000)
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
</style>
