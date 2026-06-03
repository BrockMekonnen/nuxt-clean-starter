import { ValidationFailure } from '@core/error/failures'
import type { CreateTodoParams, TodoRepository } from './todo_repository'
import type { Todo } from './todo'

export class TodoUsecases {
  constructor(private readonly repo: TodoRepository) {}

  async list(): Promise<Todo[]> {
    return await this.repo.list()
  }

  async add(params: CreateTodoParams): Promise<Todo> {
    const title = params.title.trim()
    if (!title) throw new ValidationFailure('Title is required')
    if (title.length > 200) {
      throw new ValidationFailure('Title must be 200 characters or fewer')
    }
    return await this.repo.add({ title })
  }

  async toggle(id: string): Promise<Todo> {
    if (!id.trim()) throw new ValidationFailure('Todo id is required')
    return await this.repo.toggle(id)
  }

  async remove(id: string): Promise<void> {
    if (!id.trim()) throw new ValidationFailure('Todo id is required')
    return await this.repo.remove(id)
  }
}
