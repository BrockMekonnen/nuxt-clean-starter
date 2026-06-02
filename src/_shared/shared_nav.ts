import { AppIcons } from '../_core/icons/app_icons'
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
      icon: AppIcons.home,
      route: '/home',
      order: 1
    },
    {
      id: SHARED_NAV_TAB.settings,
      titleKey: 'layoutPage.settings',
      icon: AppIcons.settings,
      route: '/settings',
      order: 40
    }
  )
}
