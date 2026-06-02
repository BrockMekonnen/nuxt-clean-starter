import type { HttpClient } from '../../../_core/http/http_client'
import type { AuthRepository, LoginParams } from '../domain/auth_repository'
import type { AuthSession } from '../domain/auth_session'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  async login(params: LoginParams): Promise<AuthSession> {
    return await this.http.post<AuthSession>('/auth/login', params)
  }
}

