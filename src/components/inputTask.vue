<template>
  <div class="flex mb-4">
    <input
      v-model="taskName"
      placeholder="Добавить новую задачу"
      class="p-2 border rounded flex-1"
    />
    <button class="bg-blue-500 text-white p-2 rounded ml-2" @click="addTask">Добавить</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const taskName = ref<string>('')

const emit = defineEmits<{
  (e: 'task-added', taskName: string): void
}>()

const addTask = () => {
  if (taskName.value.trim()) {
    emit('task-added', taskName.value)
    taskName.value = ''
  }
}
</script>
