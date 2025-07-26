<template>
  <Motion
    :animate="{
      rotate: currentRotation,
      scale: getCurrentScale()
    }"
    :transition="{
      rotate: { duration: 0 },
      scale: { type: 'spring', damping: 20, stiffness: 300 }
    }"
    :class="`m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-white text-center cursor-pointer origin-center ${className}`"
    @mouseenter="handleHoverStart"
    @mouseleave="handleHoverEnd"
  >
    <span
      v-for="(letter, i) in letters"
      :key="i"
      class="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
      :style="{
        transform: getLetterTransform(i),
        WebkitTransform: getLetterTransform(i)
      }"
    >
      {{ letter }}
    </span>
  </Motion>
</template>

<script>
import { ref, computed, watchEffect, onUnmounted } from 'vue'
import { Motion } from 'motion-v'

export default {
  name: 'CircularText',
  components: {
    Motion
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    spinDuration: {
      type: Number,
      default: 20
    },
    onHover: {
      type: String,
      default: 'speedUp'
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const letters = computed(() => Array.from(props.text))
    const isHovered = ref(false)

    const currentRotation = ref(0)
    const animationId = ref(null)
    const lastTime = ref(Date.now())
    const rotationSpeed = ref(0)

    const getCurrentSpeed = () => {
      if (isHovered.value && props.onHover === 'pause') return 0

      const baseSpeed = 360 / props.spinDuration

      if (!isHovered.value) return baseSpeed

      switch (props.onHover) {
        case 'slowDown':
          return baseSpeed / 2
        case 'speedUp':
          return baseSpeed * 4
        case 'goBonkers':
          return baseSpeed * 20
        default:
          return baseSpeed
      }
    }

    const getCurrentScale = () => {
      return isHovered.value && props.onHover === 'goBonkers' ? 0.8 : 1
    }

    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastTime.value) / 1000
      lastTime.value = now

      const targetSpeed = getCurrentSpeed()
      const speedDiff = targetSpeed - rotationSpeed.value
      const smoothingFactor = Math.min(1, deltaTime * 5)
      rotationSpeed.value += speedDiff * smoothingFactor

      currentRotation.value = (currentRotation.value + rotationSpeed.value * deltaTime) % 360

      animationId.value = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (animationId.value) {
        cancelAnimationFrame(animationId.value)
      }
      lastTime.value = Date.now()
      rotationSpeed.value = getCurrentSpeed()
      animate()
    }

    const handleHoverStart = () => {
      isHovered.value = true
    }

    const handleHoverEnd = () => {
      isHovered.value = false
    }

    const getLetterTransform = (index) => {
      const rotationDeg = (360 / letters.value.length) * index
      const factor = Math.PI / letters.value.length
      const x = factor * index
      const y = factor * index
      return `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`
    }

    watchEffect(() => {
      startAnimation()
    })

    onUnmounted(() => {
      if (animationId.value) {
        cancelAnimationFrame(animationId.value)
      }
    })

    return {
      letters,
      currentRotation,
      getCurrentScale,
      handleHoverStart,
      handleHoverEnd,
      getLetterTransform,
      className: props.className
    }
  }
}
</script>
