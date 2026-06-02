import { Constants } from '@core/constants'
import { firstNavRoute } from '@core/layout/navigation_registry'

export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.guestOnly) return

  const token = useCookie<string | null>(Constants.authTokenCookie)
  const auth = useAuthStore()

  if (token.value || auth.isAuthenticated) {
    return navigateTo(firstNavRoute())
  }
})
