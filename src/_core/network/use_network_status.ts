export function useNetworkStatus() {
  const isOnline = useState<boolean>('core.network.isOnline', () => true)

  onMounted(() => {
    isOnline.value = navigator.onLine

    const onOnline = () => (isOnline.value = true)
    const onOffline = () => (isOnline.value = false)

    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    onBeforeUnmount(() => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    })
  })

  return {
    isOnline
  }
}

