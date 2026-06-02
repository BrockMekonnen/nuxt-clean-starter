import { defineStore } from 'pinia'

/** Drawer expand/collapse — mirrors Flutter [NavigationService]. */
export const useNavigationStore = defineStore('core.navigation', () => {
  const isDrawerExpanded = ref(true)
  const isMobileDrawerOpen = ref(false)

  function toggleDrawer() {
    isDrawerExpanded.value = !isDrawerExpanded.value
  }

  function openMobileDrawer() {
    isMobileDrawerOpen.value = true
  }

  function closeMobileDrawer() {
    isMobileDrawerOpen.value = false
  }

  return {
    isDrawerExpanded,
    isMobileDrawerOpen,
    toggleDrawer,
    openMobileDrawer,
    closeMobileDrawer
  }
})
