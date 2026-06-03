import type { AuthUser } from './user'

export type AuthSession = {
  /**
   * Present only when the app talks directly to an API that returns a bearer
   * token. The default BFF flow keeps the token in an httpOnly cookie.
   */
  token: string | null
  user: AuthUser
}
