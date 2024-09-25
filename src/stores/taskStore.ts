import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/interfaces/interface'
import { v4 as uuidv4 } from 'uuid'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Array<Task>>(JSON.parse(localStorage.getItem('tasks') || '[]'))

  watchEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  })

  const createTask = (name: string) => {
    if (name.trim().length === 0) throw new Error('Имя не может быть пустым')
    const task: Task = {
      id: uuidv4(),
      position: tasks.value.length,
      name,
      isReady: false,
      createdAt: Date.now()
    }

    tasks.value.push(task)
  }

  const deleteTask = (taskId: string) => {
    const index = tasks.value.findIndex((task) => task.id === taskId)
    if (index === -1) throw new Error(`Task with ID ${taskId} not found`)
    tasks.value.splice(index, 1)
  }

  const updateTaskName = (taskId: string, newName: string) => {
    const task = tasks.value.find((task) => task.id === taskId)
    if (!task) throw new Error(`Task with ID ${taskId} not found`)
    if (newName.trim().length === 0) throw new Error('Имя не может быть пустым')

    task.name = newName
  }

  const updateTasksOrder = (newTasksOrder: Task[]) => {
    tasks.value = newTasksOrder.map((task, index) => ({
      ...task,
      position: index
    }))
  }

  return {
    tasks,
    createTask,
    deleteTask,
    updateTaskName,
    updateTasksOrder
  }
})
