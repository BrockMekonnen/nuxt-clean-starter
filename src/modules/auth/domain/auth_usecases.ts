import { ValidationFailure } from '@core/error/failures'
import type {
  AuthRepository,
  LoginParams,
  RegisterParams
} from './auth_repository'
import type { AuthSession } from './auth_session'
import type { AuthUser } from './user'

export class AuthUsecases {
  constructor(private readonly repo: AuthRepository) {}

  async login(params: LoginParams): Promise<AuthSession> {
    if (!params.email.trim()) throw new ValidationFailure('Email is required')
    if (!params.password) throw new ValidationFailure('Password is required')
    return await this.repo.login({
      email: params.email.trim(),
      password: params.password
    })
  }

  async register(params: RegisterParams): Promise<void> {
    if (!params.firstName.trim()) {
      throw new ValidationFailure('First name is required')
    }
    if (!params.lastName.trim()) {
      throw new ValidationFailure('Last name is required')
    }
    if (!params.email.trim()) throw new ValidationFailure('Email is required')
    if (!params.password) throw new ValidationFailure('Password is required')
    if (!params.isTermAndConditionAgreed) {
      throw new ValidationFailure('You must accept the terms and conditions')
    }
    return await this.repo.register(params)
  }

  async restoreSession(): Promise<AuthSession | null> {
    return await this.repo.restoreSession()
  }

  async getMe(): Promise<AuthUser> {
    return await this.repo.getMe()
  }

  async logout(): Promise<void> {
    return await this.repo.logout()
  }
}
