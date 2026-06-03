import { describe, it, expect, vi } from 'vitest'
import { TodoUsecases } from '@modules/todo/domain/todo_usecases'
import type { TodoRepository } from '@modules/todo/domain/todo_repository'
import type { Todo } from '@modules/todo/domain/todo'

function makeRepo(overrides: Partial<TodoRepository> = {}): TodoRepository {
  return {
    list: vi.fn().mockResolvedValue([]),
    add: vi.fn(),
    toggle: vi.fn(),
    remove: vi.fn(),
    ...overrides
  }
}

const sample: Todo = {
  id: '1',
  title: 'Buy milk',
  completed: false,
  createdAt: '2026-01-01T00:00:00.000Z'
}

describe('TodoUsecases.add', () => {
  it('rejects an empty title', async () => {
    const repo = makeRepo()
    const usecases = new TodoUsecases(repo)

    await expect(usecases.add({ title: '   ' })).rejects.toThrow(
      'Title is required'
    )
    expect(repo.add).not.toHaveBeenCalled()
  })

  it('trims the title and delegates to the repository', async () => {
    const add = vi.fn().mockResolvedValue(sample)
    const usecases = new TodoUsecases(makeRepo({ add }))

    await usecases.add({ title: '  Buy milk  ' })

    expect(add).toHaveBeenCalledWith({ title: 'Buy milk' })
  })
})

describe('TodoUsecases.toggle', () => {
  it('requires a non-empty id', async () => {
    const usecases = new TodoUsecases(makeRepo())

    await expect(usecases.toggle('')).rejects.toThrow('Todo id is required')
  })
})
