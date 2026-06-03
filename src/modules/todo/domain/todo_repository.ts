import type { Todo } from './todo'

export type CreateTodoParams = {
  title: string
}

export interface TodoRepository {
  list(): Promise<Todo[]>
  add(params: CreateTodoParams): Promise<Todo>
  toggle(id: string): Promise<Todo>
  remove(id: string): Promise<void>
}
