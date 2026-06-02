import type { AuthSession } from './auth_session'

export type LoginParams = {
  email: string
  password: string
}

export interface AuthRepository {
  login(params: LoginParams): Promise<AuthSession>
}

