import { AppIcons } from '../../_core/icons/app_icons'
import { registerNavDestinations } from '../../_core/layout/navigation_registry'

export const AUTH_NAV_TAB = {
  profile: 'profile'
} as const

export function registerAuthNavigation() {
  registerNavDestinations({
    id: AUTH_NAV_TAB.profile,
    titleKey: 'layoutPage.profile',
    icon: AppIcons.profile,
    route: '/profile',
    order: 30
  })
}
