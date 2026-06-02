import { defineStore } from 'pinia'

export const useNetworkStore = defineStore('core.network', () => {
  const isOnline = ref(true)
  let listenersBound = false

  function bindBrowserEvents() {
    if (!import.meta.client || listenersBound) return
    listenersBound = true

    isOnline.value = navigator.onLine

    window.addEventListener('online', () => {
      isOnline.value = true
    })
    window.addEventListener('offline', () => {
      isOnline.value = false
    })
  }

  return {
    isOnline,
    bindBrowserEvents
  }
})
