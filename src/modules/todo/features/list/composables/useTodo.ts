import { storeToRefs } from 'pinia'

export function useTodo() {
  const store = useTodoStore()
  const { items, isLoading } = storeToRefs(store)

  return {
    items,
    isLoading,
    fetchTodos: store.fetchTodos,
    addTodo: store.addTodo,
    toggleTodo: store.toggleTodo,
    removeTodo: store.removeTodo
  }
}
