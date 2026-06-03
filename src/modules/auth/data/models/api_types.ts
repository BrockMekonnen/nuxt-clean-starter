export type ApiDataResponse<T> = {
  data: T
}

export type LoginResponseData = {
  token?: string
  user?: UserDto
}

/**
 * Wire shape returned by the users API. Kept independent of the domain
 * `AuthUser` so transport changes don't leak into the domain layer.
 */
export type UserDto = {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  isEmailVerified?: boolean
  roles?: unknown
  createdAt?: string
  updatedAt?: string
}
