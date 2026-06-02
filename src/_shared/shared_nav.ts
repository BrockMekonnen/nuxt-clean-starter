import { registerNavDestinations } from '../_core/layout/navigation_registry'

export const SHARED_NAV_TAB = {
  home: 'home',
  settings: 'settings'
} as const

export function registerSharedNavigation() {
  registerNavDestinations(
    {
      id: SHARED_NAV_TAB.home,
      titleKey: 'layoutPage.home',
      icon: '🏠',
      route: '/home',
      order: 1
    },
    {
      id: SHARED_NAV_TAB.settings,
      titleKey: 'layoutPage.settings',
      icon: '⚙️',
      route: '/settings',
      order: 40
    }
  )
}
