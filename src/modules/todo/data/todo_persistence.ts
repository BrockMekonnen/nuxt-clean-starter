import { CacheFailure } from '@core/error/failures'
import type { Todo } from '../domain/todo'

const STORAGE_KEY = 'todo.items'

export interface TodoPersistence {
  load(): Todo[]
  save(items: Todo[]): void
}

export function createTodoPersistence(): TodoPersistence {
  return {
    load() {
      if (!import.meta.client) return []
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const parsed = JSON.parse(raw) as unknown
        if (!Array.isArray(parsed)) return []
        return parsed.filter(isTodo)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
        throw new CacheFailure('Failed to read todos')
      }
    },

    save(items) {
      if (!import.meta.client) return
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch {
        throw new CacheFailure('Failed to save todos')
      }
    }
  }
}

function isTodo(value: unknown): value is Todo {
  if (!value || typeof value !== 'object') return false
  const t = value as Todo
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'string'
  )
}
