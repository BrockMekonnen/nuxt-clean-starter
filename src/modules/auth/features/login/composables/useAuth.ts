import type { AuthSession } from '../../../domain/auth_session'
import { AUTH_TOKENS } from '../../../auth_tokens'
import type { AuthUsecases } from '../../../domain/auth_usecases'

export function useAuth() {
  const session = useState<AuthSession | null>('auth.session', () => null)
  const isLoading = useState<boolean>('auth.loading', () => false)
  const errorMessage = useState<string | null>('auth.error', () => null)

  async function login(email: string, password: string) {
    isLoading.value = true
    errorMessage.value = null
    try {
      const { $di } = useNuxtApp()
      const authUsecases = $di.resolve<AuthUsecases>(AUTH_TOKENS.AuthUsecases)
      session.value = await authUsecases.login({ email, password })
    } catch (err) {
      errorMessage.value =
        err instanceof Error ? err.message : 'Unexpected error'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    session.value = null
  }

  return {
    session,
    isLoading,
    errorMessage,
    login,
    logout
  }
}

