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

const guestMiddleware = (await import('../guest')).default
const from = {} as never

beforeEach(() => {
  vi.clearAllMocks()
  mocks.useCookie.mockReturnValue({ value: null })
  mocks.useAuthStore.mockReturnValue({ isAuthenticated: false })
})

describe('guest middleware', () => {
  it('allows guests to open login', async () => {
    const result = await guestMiddleware(
      {
        meta: { guestOnly: true },
        path: '/login'
      } as never,
      from
    )

    expect(result).toBeUndefined()
    expect(mocks.navigateTo).not.toHaveBeenCalled()
  })

  it('redirects when an auth cookie is present', async () => {
    mocks.useCookie.mockReturnValue({ value: 'token-abc' })

    await guestMiddleware(
      {
        meta: { guestOnly: true },
        path: '/login'
      } as never,
      from
    )

    expect(mocks.navigateTo).toHaveBeenCalledWith('/home')
  })

  it('redirects when the auth store is authenticated', async () => {
    mocks.useAuthStore.mockReturnValue({ isAuthenticated: true })

    await guestMiddleware(
      {
        meta: { guestOnly: true },
        path: '/login'
      } as never,
      from
    )

    expect(mocks.navigateTo).toHaveBeenCalledWith('/home')
  })
})
