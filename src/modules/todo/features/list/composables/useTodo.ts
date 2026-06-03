import { storeToRefs } from 'pinia'

export function useTodo() {
  const store = useTodoStore()
  const { items, isLoading, errorMessage } = storeToRefs(store)

  return {
    items,
    isLoading,
    errorMessage,
    fetchTodos: store.fetchTodos,
    addTodo: store.addTodo,
    toggleTodo: store.toggleTodo,
    removeTodo: store.removeTodo
  }
}
