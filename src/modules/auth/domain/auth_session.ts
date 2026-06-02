export type AuthUser = {
  id: string
  email: string
}

export type AuthSession = {
  token: string
  user: AuthUser
}

