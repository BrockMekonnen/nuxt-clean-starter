import { storeToRefs } from 'pinia'

export function useAuth() {
  const store = useAuthStore()
  const {
    session,
    user,
    isLoading,
    isBootstrapping,
    errorMessage,
    isAuthenticated
  } = storeToRefs(store)

  return {
    session,
    user,
    isLoading,
    isBootstrapping,
    errorMessage,
    isAuthenticated,
    login: store.login,
    register: store.register,
    logout: store.logout,
    bootstrap: store.bootstrap
  }
}
