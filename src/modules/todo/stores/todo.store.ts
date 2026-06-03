import { defineStore } from 'pinia'
import { failureMessage } from '@core/error/failures'
import type { Todo } from '../domain/todo'
import { TODO_TOKENS } from '../todo_tokens'
import type { TodoUsecases } from '../domain/todo_usecases'

export const useTodoStore = defineStore('todo', () => {
  const items = ref<Todo[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  function resolveUsecases(): TodoUsecases {
    const { $di } = useNuxtApp()
    return $di.resolve<TodoUsecases>(TODO_TOKENS.TodoUsecases)
  }

  async function fetchTodos() {
    isLoading.value = true
    errorMessage.value = null
    try {
      items.value = await resolveUsecases().list()
    } catch (err) {
      errorMessage.value = failureMessage(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function addTodo(title: string) {
    errorMessage.value = null
    try {
      await resolveUsecases().add({ title })
      items.value = await resolveUsecases().list()
    } catch (err) {
      errorMessage.value = failureMessage(err)
      throw err
    }
  }

  async function toggleTodo(id: string) {
    errorMessage.value = null
    try {
      await resolveUsecases().toggle(id)
      items.value = await resolveUsecases().list()
    } catch (err) {
      errorMessage.value = failureMessage(err)
      throw err
    }
  }

  async function removeTodo(id: string) {
    errorMessage.value = null
    try {
      await resolveUsecases().remove(id)
      items.value = await resolveUsecases().list()
    } catch (err) {
      errorMessage.value = failureMessage(err)
      throw err
    }
  }

  return {
    items,
    isLoading,
    errorMessage,
    fetchTodos,
    addTodo,
    toggleTodo,
    removeTodo
  }
})
