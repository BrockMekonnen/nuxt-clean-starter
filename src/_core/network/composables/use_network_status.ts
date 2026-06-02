import { storeToRefs } from 'pinia'

export function useNetworkStatus() {
  const store = useNetworkStore()
  const { isOnline } = storeToRefs(store)

  onMounted(() => {
    store.bindBrowserEvents()
  })

  return {
    isOnline
  }
}
