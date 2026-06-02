export default defineNuxtPlugin(async () => {
  await useAuthStore().bootstrap()
})
