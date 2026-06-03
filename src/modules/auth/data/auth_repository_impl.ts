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
      const user = response.data?.user
        ? mapUserDto(response.data.user)
        : await this.getMe(token ?? undefined)

      if (token) {
        this.persistence.persistToken(token)
      }
      const session: AuthSession = { token: token ?? null, user }
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

    try {
      const response = await this.http.get<ApiDataResponse<UserDto>>(
        ApiPaths.usersMe,
        token ? { authToken: token } : undefined
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
    try {
      const user = await this.getMe(token ?? undefined)
      const session: AuthSession = { token, user }
      this.persistence.persistSession(session)
      return session
    } catch {
      await this.logout()
      return null
    }
  }

  async logout(): Promise<void> {
    try {
      await this.http.post(ApiPaths.authLogout)
    } catch {
      // Clear local state even if the server session is already gone.
    }
    this.persistence.clear()
  }
}
