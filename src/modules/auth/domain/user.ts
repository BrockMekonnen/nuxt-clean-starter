export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  isEmailVerified?: boolean
  roles?: string[]
}

export const emptyAuthUser: AuthUser = {
  id: '-',
  firstName: '-',
  lastName: '-',
  phone: '-',
  email: '-',
  isEmailVerified: false,
  roles: []
}
