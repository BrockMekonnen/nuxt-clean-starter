import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useAuthStore } from '@modules/auth/stores/auth.store'
import type { AuthSession } from '@modules/auth/domain/auth_session'

const usecases = {
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  restoreSession: vi.fn(),
  getMe: vi.fn()
}

// The store resolves use cases through `useNuxtApp().$di`; stub the container.
// `ref`/`computed` are injected as real Vue functions by the Nuxt test plugin.
mockNuxtImport('useNuxtApp', () => {
  return () => ({ $di: { resolve: () => usecases } })
})

const session: AuthSession = {
  token: 't',
  user: {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '+1',
    email: 'jane@test.com'
  }
}

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})

describe('useAuthStore', () => {
  it('stores the session on a successful login', async () => {
    usecases.login.mockResolvedValue(session)
    const store = useAuthStore()

    await store.login('jane@test.com', 'secret')

    expect(store.isAuthenticated).toBe(true)
    expect(store.user?.email).toBe('jane@test.com')
    expect(store.isLoading).toBe(false)
  })

  it('captures the error message and rethrows on failure', async () => {
    usecases.login.mockRejectedValue(new Error('Nope'))
    const store = useAuthStore()

    await expect(store.login('a@b.com', 'x')).rejects.toThrow('Nope')
    expect(store.errorMessage).toBe('Nope')
    expect(store.isAuthenticated).toBe(false)
  })

  it('clears the session on logout', async () => {
    usecases.login.mockResolvedValue(session)
    usecases.logout.mockResolvedValue(undefined)
    const store = useAuthStore()

    await store.login('jane@test.com', 'secret')
    await store.logout()

    expect(store.isAuthenticated).toBe(false)
    expect(store.errorMessage).toBeNull()
  })
})
