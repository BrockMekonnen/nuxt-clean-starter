import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthRepositoryImpl } from '@modules/auth/data/auth_repository_impl'
import type { AuthPersistence } from '@modules/auth/data/auth_persistence'
import { ApiError } from '@core/http/api_error'
import { ApiPaths } from '@core/constants'
import type { HttpClient } from '@core/http/http_client'

function makeHttp(overrides: Partial<HttpClient> = {}): HttpClient {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    ...overrides
  }
}

function makePersistence(): AuthPersistence {
  return {
    getToken: vi.fn(),
    persistToken: vi.fn(),
    getCachedUser: vi.fn(),
    persistUser: vi.fn(),
    getCachedSession: vi.fn(),
    persistSession: vi.fn(),
    clear: vi.fn()
  }
}

let persistence: AuthPersistence

beforeEach(() => {
  persistence = makePersistence()
})

describe('AuthRepositoryImpl.login', () => {
  it('persists the token, loads the profile and returns the session', async () => {
    const userDto = {
      id: '1',
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '+100',
      email: 'jane@test.com'
    }
    const post = vi.fn().mockResolvedValue({ data: { token: 'abc' } })
    const get = vi.fn().mockResolvedValue({ data: userDto })
    const repo = new AuthRepositoryImpl(makeHttp({ post, get }), persistence)

    const session = await repo.login({
      email: 'jane@test.com',
      password: 'secret'
    })

    expect(post).toHaveBeenCalledWith(ApiPaths.usersLogin, {
      email: 'jane@test.com',
      password: 'secret'
    })
    expect(persistence.persistToken).toHaveBeenCalledWith('abc')
    expect(session.token).toBe('abc')
    expect(session.user.email).toBe('jane@test.com')
    expect(persistence.persistSession).toHaveBeenCalledWith(session)
  })

  it('clears persistence and surfaces an ApiError with the status code', async () => {
    const post = vi.fn().mockRejectedValue({
      statusCode: 401,
      data: { message: 'Invalid credentials' }
    })
    const repo = new AuthRepositoryImpl(makeHttp({ post }), persistence)

    const error = await repo
      .login({ email: 'jane@test.com', password: 'wrong' })
      .catch((e) => e)

    expect(error).toBeInstanceOf(ApiError)
    expect(error.message).toBe('Invalid credentials')
    expect(error.statusCode).toBe(401)
    expect(persistence.clear).toHaveBeenCalled()
  })
})
