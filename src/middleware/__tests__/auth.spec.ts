// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mocks = vi.hoisted(() => ({
  navigateTo: vi.fn(),
  useCookie: vi.fn(() => ({ value: null as string | null })),
  useAuthStore: vi.fn(() => ({ isAuthenticated: false }))
}))

mockNuxtImport('navigateTo', () => mocks.navigateTo)
mockNuxtImport('useCookie', () => mocks.useCookie)
mockNuxtImport('useAuthStore', () => mocks.useAuthStore)

const authMiddleware = (await import('../auth')).default

beforeEach(() => {
  vi.clearAllMocks()
  mocks.useCookie.mockReturnValue({ value: null })
  mocks.useAuthStore.mockReturnValue({ isAuthenticated: false })
})

describe('auth middleware', () => {
  it('allows public routes', async () => {
    const result = await authMiddleware({
      meta: {},
      fullPath: '/'
    } as never)

    expect(result).toBeUndefined()
    expect(mocks.navigateTo).not.toHaveBeenCalled()
  })

  it('redirects to login with return path when unauthenticated', async () => {
    await authMiddleware({
      meta: { requiresAuth: true },
      fullPath: '/settings'
    } as never)

    expect(mocks.navigateTo).toHaveBeenCalledWith({
      path: '/login',
      query: { redirect: '/settings' }
    })
  })
})
