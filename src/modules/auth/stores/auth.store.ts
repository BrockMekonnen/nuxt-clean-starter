import { defineStore } from 'pinia'
import type { AuthSession } from '../domain/auth_session'
import { AUTH_TOKENS } from '../auth_tokens'
import type { AuthUsecases } from '../domain/auth_usecases'

const SESSION_STORAGE_KEY = 'auth.session'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<AuthSession | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const isAuthenticated = computed(() => session.value !== null)

  function persistSession(value: AuthSession | null) {
    if (!import.meta.client) return
    if (value) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(value))
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY)
    }
  }

  function hydrateFromStorage() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY)
      if (raw) {
        session.value = JSON.parse(raw) as AuthSession
      }
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      session.value = null
    }
  }

  function setSession(value: AuthSession | null) {
    session.value = value
    persistSession(value)
  }

  async function login(email: string, password: string) {
    isLoading.value = true
    errorMessage.value = null
    try {
      const { $di } = useNuxtApp()
      const authUsecases = $di.resolve<AuthUsecases>(AUTH_TOKENS.AuthUsecases)
      setSession(await authUsecases.login({ email, password }))
    } catch (err) {
      errorMessage.value =
        err instanceof Error ? err.message : 'Unexpected error'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    setSession(null)
    errorMessage.value = null
  }

  return {
    session,
    isLoading,
    errorMessage,
    isAuthenticated,
    hydrateFromStorage,
    login,
    logout
  }
})
