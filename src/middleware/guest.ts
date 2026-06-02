import { firstNavRoute } from '../_core/layout/navigation_registry'

export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.guestOnly) return

  const auth = useAuthStore()
  if (auth.isAuthenticated) {
    return navigateTo(firstNavRoute())
  }
})
