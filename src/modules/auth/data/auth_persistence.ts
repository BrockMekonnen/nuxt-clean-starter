import { Constants } from '@core/constants'
import type { AuthSession } from '../domain/auth_session'
import type { AuthUser } from '../domain/user'
import { mapUserDto } from './models/user_mapper'
import type { UserDto } from './models/api_types'

export interface AuthPersistence {
  getToken(): string | null
  persistToken(token: string | null): void
  getCachedUser(): AuthUser | null
  persistUser(user: AuthUser): void
  getCachedSession(): AuthSession | null
  persistSession(session: AuthSession | null): void
  clear(): void
}

export function createAuthPersistence(): AuthPersistence {
  // The token lives only in the cookie so it is the single source of truth on
  // both server and client. The user object is cached in localStorage purely as
  // a client-side fast path to avoid a `getMe` round-trip on reload.
  const tokenCookie = useCookie<string | null>(Constants.authTokenCookie, {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax'
  })

  return {
    getToken() {
      return tokenCookie.value ?? null
    },

    persistToken(token) {
      tokenCookie.value = token
    },

    getCachedUser() {
      if (!import.meta.client) return null
      try {
        const raw = localStorage.getItem(Constants.authUserStorageKey)
        if (!raw) return null
        return mapUserDto(JSON.parse(raw) as UserDto)
      } catch {
        localStorage.removeItem(Constants.authUserStorageKey)
        return null
      }
    },

    persistUser(user) {
      if (!import.meta.client) return
      localStorage.setItem(Constants.authUserStorageKey, JSON.stringify(user))
    },

    getCachedSession() {
      const token = this.getToken()
      if (!token) return null
      const user = this.getCachedUser()
      if (!user) return null
      return { token, user }
    },

    persistSession(session) {
      if (!session) {
        this.clear()
        return
      }
      this.persistToken(session.token)
      this.persistUser(session.user)
    },

    clear() {
      this.persistToken(null)
      if (!import.meta.client) return
      localStorage.removeItem(Constants.authUserStorageKey)
    }
  }
}
