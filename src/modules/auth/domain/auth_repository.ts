import type { AuthSession } from './auth_session'
import type { AuthUser } from './user'

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  isTermAndConditionAgreed: boolean
}

export interface AuthRepository {
  login(params: LoginParams): Promise<AuthSession>
  register(params: RegisterParams): Promise<void>
  getMe(accessToken?: string): Promise<AuthUser>
  restoreSession(): Promise<AuthSession | null>
  logout(): Promise<void>
}
