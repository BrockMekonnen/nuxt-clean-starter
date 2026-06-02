import { Constants } from '../_core/constants'

export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.requiresAuth) return

  const token = useCookie<string | null>(Constants.authTokenCookie)
  const auth = useAuthStore()

  if (token.value || auth.isAuthenticated) return

  return navigateTo('/errors/401')
})
