import { describe, it, expect, vi } from 'vitest'
import { AuthUsecases } from '@modules/auth/domain/auth_usecases'
import type { AuthRepository } from '@modules/auth/domain/auth_repository'
import type { AuthSession } from '@modules/auth/domain/auth_session'

function makeRepo(overrides: Partial<AuthRepository> = {}): AuthRepository {
  return {
    login: vi.fn(),
    register: vi.fn(),
    getMe: vi.fn(),
    restoreSession: vi.fn(),
    logout: vi.fn(),
    ...overrides
  }
}

const session: AuthSession = {
  token: 'token-123',
  user: {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '+100',
    email: 'jane@test.com'
  }
}

describe('AuthUsecases.login', () => {
  it('rejects an empty email before hitting the repository', async () => {
    const repo = makeRepo()
    const usecases = new AuthUsecases(repo)

    await expect(
      usecases.login({ email: '  ', password: 'secret' })
    ).rejects.toThrow('Email is required')
    expect(repo.login).not.toHaveBeenCalled()
  })

  it('trims the email and delegates to the repository', async () => {
    const login = vi.fn().mockResolvedValue(session)
    const usecases = new AuthUsecases(makeRepo({ login }))

    const result = await usecases.login({
      email: '  jane@test.com ',
      password: 'secret'
    })

    expect(login).toHaveBeenCalledWith({
      email: 'jane@test.com',
      password: 'secret'
    })
    expect(result).toEqual(session)
  })
})

describe('AuthUsecases.register', () => {
  it('requires the terms to be accepted', async () => {
    const register = vi.fn()
    const usecases = new AuthUsecases(makeRepo({ register }))

    await expect(
      usecases.register({
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '+100',
        email: 'jane@test.com',
        password: 'secret',
        isTermAndConditionAgreed: false
      })
    ).rejects.toThrow('terms and conditions')
    expect(register).not.toHaveBeenCalled()
  })
})
