import { storeToRefs } from 'pinia'

/**
 * UI facade over the auth Pinia store.
 * Pages can use this composable or `useAuthStore()` directly.
 */
export function useAuth() {
  const store = useAuthStore()
  const { session, isLoading, errorMessage, isAuthenticated } =
    storeToRefs(store)

  return {
    session,
    isLoading,
    errorMessage,
    isAuthenticated,
    login: store.login,
    logout: store.logout
  }
}
