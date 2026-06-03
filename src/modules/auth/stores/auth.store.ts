import { defineStore } from 'pinia'
import { failureMessage } from '@core/error/failures'
import type { AuthSession } from '../domain/auth_session'
import { AUTH_TOKENS } from '../auth_tokens'
import type { AuthUsecases } from '../domain/auth_usecases'
import type { LoginParams, RegisterParams } from '../domain/auth_repository'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<AuthSession | null>(null)
  const isLoading = ref(false)
  const isBootstrapping = ref(false)
  const errorMessage = ref<string | null>(null)

  const isAuthenticated = computed(() => session.value !== null)
  const user = computed(() => session.value?.user ?? null)

  function setSession(value: AuthSession | null) {
    session.value = value
  }

  function resolveUsecases(): AuthUsecases {
    const { $di } = useNuxtApp()
    return $di.resolve<AuthUsecases>(AUTH_TOKENS.AuthUsecases)
  }

  async function bootstrap() {
    // Already hydrated (e.g. from the SSR payload) or in flight — skip.
    if (session.value || isBootstrapping.value) return
    isBootstrapping.value = true
    try {
      const restored = await resolveUsecases().restoreSession()
      setSession(restored)
    } finally {
      isBootstrapping.value = false
    }
  }

  async function login(email: string, password: string) {
    isLoading.value = true
    errorMessage.value = null
    try {
      const params: LoginParams = { email, password }
      setSession(await resolveUsecases().login(params))
    } catch (err) {
      errorMessage.value = failureMessage(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(params: RegisterParams) {
    isLoading.value = true
    errorMessage.value = null
    try {
      await resolveUsecases().register(params)
    } catch (err) {
      errorMessage.value = failureMessage(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    await resolveUsecases().logout()
    setSession(null)
    errorMessage.value = null
  }

  return {
    session,
    user,
    isLoading,
    isBootstrapping,
    errorMessage,
    isAuthenticated,
    bootstrap,
    login,
    register,
    logout
  }
})
