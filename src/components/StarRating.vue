<template>
  <div class="star-rating">
    <span
      v-for="star in max_starts"
      :key="star"
      class="star"
      :class="{ filled: star <= (hoverRating || currentRating) }"
      @click="setRating(star)"
      @mouseover="hoverRating = star"
      @mouseleave="hoverRating = 0"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    max_starts: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      currentRating: this.modelValue,
      hoverRating: 0,
    };
  },
  watch: {
    modelValue(newVal) {
      this.currentRating = newVal;
      alert(this.currentRating)
    },
  },
  methods: {
    setRating(star) {
      this.currentRating = star;
      this.$emit("input", star); // v-model support
      this.$emit("change", star); // custom event
    },
  },
};
</script>

<style scoped>
.star-rating {
  display: inline-block;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
}
.star {
  transition: color 0.2s;
}
.star.filled {
  color: #ffd055;
}
</style>