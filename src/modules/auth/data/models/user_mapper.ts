import type { AuthUser } from '../../domain/user'
import type { UserDto } from './api_types'

export function mapUserDto(dto: UserDto): AuthUser {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    phone: dto.phone,
    email: dto.email,
    isEmailVerified: dto.isEmailVerified ?? false,
    roles: Array.isArray(dto.roles) ? dto.roles.map(String) : []
  }
}
