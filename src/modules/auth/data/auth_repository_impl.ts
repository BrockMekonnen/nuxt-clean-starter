import { ApiPaths } from '@core/constants'
import { ApiError } from '@core/http/api_error'
import type { HttpClient } from '@core/http/http_client'
import type {
  AuthRepository,
  LoginParams,
  RegisterParams
} from '../domain/auth_repository'
import type { AuthSession } from '../domain/auth_session'
import type { AuthUser } from '../domain/user'
import type { AuthPersistence } from './auth_persistence'
import type {
  ApiDataResponse,
  LoginResponseData,
  UserDto
} from './models/api_types'
import { mapUserDto } from './models/user_mapper'

function bearerHeaders(token: string): { headers: Record<string, string> } {
  return { headers: { Authorization: `Bearer ${token}` } }
}

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly http: HttpClient,
    private readonly persistence: AuthPersistence
  ) {}

  async login(params: LoginParams): Promise<AuthSession> {
    try {
      const response = await this.http.post<ApiDataResponse<LoginResponseData>>(
        ApiPaths.usersLogin,
        {
          email: params.email,
          password: params.password
        }
      )

      const token = response.data?.token
      if (!token) {
        throw new ApiError('Authentication failed: no token returned.')
      }

      this.persistence.persistToken(token)
      const user = await this.getMe(token)
      const session: AuthSession = { token, user }
      this.persistence.persistSession(session)
      return session
    } catch (err) {
      this.persistence.clear()
      throw ApiError.from(err)
    }
  }

  async register(params: RegisterParams): Promise<void> {
    try {
      await this.http.post(ApiPaths.usersRegister, {
        firstName: params.firstName,
        lastName: params.lastName,
        phone: params.phone,
        email: params.email,
        password: params.password,
        isTermAndConditionAgreed: params.isTermAndConditionAgreed
      })
    } catch (err) {
      throw ApiError.from(err)
    }
  }

  async getMe(accessToken?: string): Promise<AuthUser> {
    const token = accessToken ?? this.persistence.getToken()
    if (!token) {
      throw new ApiError('Not authenticated.')
    }

    try {
      const response = await this.http.get<ApiDataResponse<UserDto>>(
        ApiPaths.usersMe,
        bearerHeaders(token)
      )
      const dto = response.data
      if (!dto?.id) {
        throw new ApiError('Failed to load user profile.')
      }
      const user = mapUserDto(dto)
      this.persistence.persistUser(user)
      return user
    } catch (err) {
      throw ApiError.from(err)
    }
  }

  async restoreSession(): Promise<AuthSession | null> {
    const cached = this.persistence.getCachedSession()
    if (cached) return cached

    const token = this.persistence.getToken()
    if (!token) return null

    try {
      const user = await this.getMe()
      const session: AuthSession = { token, user }
      this.persistence.persistSession(session)
      return session
    } catch {
      await this.logout()
      return null
    }
  }

  async logout(): Promise<void> {
    this.persistence.clear()
  }
}
