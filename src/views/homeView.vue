<script setup lang="ts">
import { ref, computed, toRef } from 'vue'
import draggable from 'vuedraggable'
import { useTaskStore } from '@/stores/taskStore'
import type { Task } from '@/interfaces/interface'

const store = useTaskStore()
const newTaskName = ref<string>('')
const tasks = computed(() => store.tasks)
const tasksClone = toRef(store, 'tasks')

const addTask = () => {
  if (newTaskName.value.trim()) {
    store.createTask(newTaskName.value)
    newTaskName.value = ''
  }
}

const editTask = (task: Task) => {
  const updatedName = prompt('Изменить задачу:', task.name)
  if (updatedName) {
    store.updateTaskName(task.id, updatedName.trim())
  }
}

const updateTaskPosition = () => {
  store.updateTasksOrder([...tasksClone.value])
}

const clearTask = (event: DragEvent) => {
  const taskId = event.dataTransfer?.getData('taskId')
  if (taskId) {
    store.deleteTask(taskId)
  }
}
</script>
<template>
  <div class="container">
    <div
      class="drop-zone h-12 border-2 border-dashed border-gray-400 rounded flex items-center justify-center text-gray-400 mb-4"
      @dragover.prevent
      @drop="clearTask"
    >
      Перетащите задачу сюда, чтобы удалить
    </div>

    <div class="flex mb-4">
      <input
        v-model="newTaskName"
        placeholder="Добавить новую задачу"
        class="p-2 border rounded flex-1"
      />
      <button class="bg-blue-500 text-white p-2 rounded ml-2" @click="addTask">Добавить</button>
    </div>

    <h1 class="text-2xl font-bold mb-4">ToDo List</h1>

    <div>
      <draggable :list="tasksClone" @end="updateTaskPosition" item-key="id">
        <template #item="{ element: task }">
          <div
            class="flex justify-between items-center p-3 border rounded shadow mb-2"
            :class="{ 'bg-gray-200': task.isReady }"
            @dragstart="(event) => event.dataTransfer.setData('taskId', task.id)"
          >
            <input type="checkbox" v-model="task.isReady" />
            <span
              @click="editTask(task)"
              class="flex-1 ml-2 cursor-pointer"
              :class="{ 'line-through text-gray-500': task.isReady }"
            >
              {{ task.name }}
            </span>
          </div>
        </template>
      </draggable>
    </div>

    <p v-if="tasks.length === 0" class="text-center text-gray-600">У вас нет задач.</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.drop-zone {
  cursor: pointer;
}
@media (max-width: 640px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
