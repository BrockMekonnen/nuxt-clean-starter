export default defineNuxtPlugin(async () => {
  // `callOnce` runs the restore on the server during SSR and dedupes on the
  // client, so the session hydrates from the payload instead of refetching.
  await callOnce('auth:bootstrap', () => useAuthStore().bootstrap())
})
