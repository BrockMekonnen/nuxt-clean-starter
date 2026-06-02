import { AuthRepositoryImpl } from './data/auth_repository_impl'
import { createAuthPersistence } from './data/auth_persistence'
import { AuthUsecases } from './domain/auth_usecases'
import type { DependencyContainer } from 'tsyringe'
import { TOKENS } from '../../_core/di/tokens'
import { AUTH_TOKENS } from './auth_tokens'

export function registerAuthModule(di: DependencyContainer) {
  const persistence = createAuthPersistence()
  di.register(AUTH_TOKENS.AuthPersistence, { useValue: persistence })

  di.register(AUTH_TOKENS.AuthRepository, {
    useFactory: (c) =>
      new AuthRepositoryImpl(
        c.resolve(TOKENS.HttpClient),
        c.resolve(AUTH_TOKENS.AuthPersistence)
      )
  })

  di.register(AUTH_TOKENS.AuthUsecases, {
    useFactory: (c) => new AuthUsecases(c.resolve(AUTH_TOKENS.AuthRepository))
  })
}
