/** Mirrors Flutter `Constants` (storage keys, shared app values). */
export const Constants = {
  authTokenCookie: 'auth_token',
  authUserStorageKey: 'auth.user'
} as const

/** API paths relative to `runtimeConfig.public.apiBase` (includes `/api`). */
export const ApiPaths = {
  usersLogin: '/users/login',
  usersRegister: '/users',
  usersMe: '/users/me',
  authLogout: '/auth/logout'
} as const
