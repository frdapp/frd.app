<template>
  <div class="tag-list">
    <div class="tags">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="tag badge bg-primary"
      >
        {{ tag }}
        <button v-if="readonly == false || readonly == 'false'" type="button" class="btn-close btn-close-white ms-1" @click="removeTag(index)" />
      </span>
    </div>

    <div v-show="readonly == false || readonly == 'false'" class="input-group" style="max-width:300px;margin-top:5px">
      <input
        v-model="newTag"
        @keyup.enter="addTag"
        type="text"
        class="form-control"
        placeholder="Add tag"
      />
      <button class="btn btn-primary" @click="addTag">Add</button>

    
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  readonly:{
    type:[Boolean,String],
    default:false,
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const tags = ref([...props.modelValue])
const newTag = ref('')

// 添加标签
function addTag() {
  const tag = newTag.value.trim()
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
    emit('update:modelValue', tags.value)
  }
  newTag.value = ''
}

// 删除标签
function removeTag(index) {
  tags.value.splice(index, 1)
  emit('update:modelValue', tags.value)
}

// 同步 props 更新
watch(() => props.modelValue, (val) => {
  tags.value = [...val]
})
</script>

<style scoped>
.tag-list .tag {
  display: inline-flex;
  align-items: center;
  padding: 0.4em 0.75em;
  font-size: 0.85rem;
}
</style>