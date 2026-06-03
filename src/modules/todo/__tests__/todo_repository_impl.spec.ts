import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TodoRepositoryImpl } from '@modules/todo/data/todo_repository_impl'
import type { TodoPersistence } from '@modules/todo/data/todo_persistence'

function makePersistence(initial: ReturnType<TodoPersistence['load']> = []) {
  let items = [...initial]
  const save = vi.fn((next: typeof items) => {
    items = [...next]
  })
  return {
    load: vi.fn(() => [...items]),
    save,
    get items() {
      return items
    }
  }
}

describe('TodoRepositoryImpl', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('adds a todo and persists the list', async () => {
    const persistence = makePersistence()
    const repo = new TodoRepositoryImpl(persistence)

    const todo = await repo.add({ title: 'First task' })

    expect(todo.title).toBe('First task')
    expect(todo.completed).toBe(false)
    expect(persistence.save).toHaveBeenCalled()
    expect((await repo.list()).map((t) => t.id)).toContain(todo.id)
  })

  it('toggles completion', async () => {
    const persistence = makePersistence()
    const repo = new TodoRepositoryImpl(persistence)
    const created = await repo.add({ title: 'Toggle me' })

    const updated = await repo.toggle(created.id)

    expect(updated.completed).toBe(true)
    expect((await repo.list())[0]?.completed).toBe(true)
  })

  it('removes a todo', async () => {
    const persistence = makePersistence()
    const repo = new TodoRepositoryImpl(persistence)
    const created = await repo.add({ title: 'Delete me' })

    await repo.remove(created.id)

    expect(await repo.list()).toHaveLength(0)
  })
})
