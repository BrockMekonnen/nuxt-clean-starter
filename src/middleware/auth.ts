export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.requiresAuth) return

  const auth = useAuthStore()
  if (!auth.isAuthenticated) {
    return navigateTo('/errors/401')
  }
})
