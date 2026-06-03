import type {
  CreateTodoParams,
  TodoRepository
} from '../domain/todo_repository'
import type { Todo } from '../domain/todo'
import type { TodoPersistence } from './todo_persistence'

function newId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export class TodoRepositoryImpl implements TodoRepository {
  private items: Todo[]

  constructor(private readonly persistence: TodoPersistence) {
    this.items = [...persistence.load()]
  }

  async list(): Promise<Todo[]> {
    return [...this.items].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async add(params: CreateTodoParams): Promise<Todo> {
    const todo: Todo = {
      id: newId(),
      title: params.title,
      completed: false,
      createdAt: new Date().toISOString()
    }
    this.items = [todo, ...this.items]
    this.persistence.save(this.items)
    return todo
  }

  async toggle(id: string): Promise<Todo> {
    const index = this.items.findIndex((t) => t.id === id)
    if (index === -1) throw new Error('Todo not found')
    const updated: Todo = {
      ...this.items[index]!,
      completed: !this.items[index]!.completed
    }
    this.items = this.items.map((t) => (t.id === id ? updated : t))
    this.persistence.save(this.items)
    return updated
  }

  async remove(id: string): Promise<void> {
    this.items = this.items.filter((t) => t.id !== id)
    this.persistence.save(this.items)
  }
}
