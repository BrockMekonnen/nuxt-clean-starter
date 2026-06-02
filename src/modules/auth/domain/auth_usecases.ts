import type { AuthRepository, LoginParams } from './auth_repository'
import type { AuthSession } from './auth_session'

export class AuthUsecases {
  constructor(private readonly repo: AuthRepository) {}

  async login(params: LoginParams): Promise<AuthSession> {
    if (!params.email.trim()) throw new Error('Email is required')
    if (!params.password) throw new Error('Password is required')
    return await this.repo.login(params)
  }
}

