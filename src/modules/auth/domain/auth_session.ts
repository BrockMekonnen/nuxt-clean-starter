import type { AuthUser } from './user'

export type AuthSession = {
  token: string
  user: AuthUser
}
