import type { AuthUser } from '../../domain/user'

export type ApiDataResponse<T> = {
  data: T
}

export type LoginResponseData = {
  token: string
}

export type UserDto = AuthUser & {
  createdAt?: string
  updatedAt?: string
}
