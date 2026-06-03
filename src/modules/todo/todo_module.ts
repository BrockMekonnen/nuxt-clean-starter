import { TodoRepositoryImpl } from './data/todo_repository_impl'
import { createTodoPersistence } from './data/todo_persistence'
import { TodoUsecases } from './domain/todo_usecases'
import type { DependencyContainer } from 'tsyringe'
import { TODO_TOKENS } from './todo_tokens'

export function registerTodoModule(di: DependencyContainer) {
  const persistence = createTodoPersistence()
  di.register(TODO_TOKENS.TodoPersistence, { useValue: persistence })

  di.register(TODO_TOKENS.TodoRepository, {
    useFactory: (c) =>
      new TodoRepositoryImpl(c.resolve(TODO_TOKENS.TodoPersistence))
  })

  di.register(TODO_TOKENS.TodoUsecases, {
    useFactory: (c) => new TodoUsecases(c.resolve(TODO_TOKENS.TodoRepository))
  })
}
