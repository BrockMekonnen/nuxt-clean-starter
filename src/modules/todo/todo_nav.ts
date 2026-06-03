import { AppIcons } from '@core/icons/app_icons'
import { registerNavDestinations } from '@core/layout/navigation_registry'

export const TODO_NAV_TAB = {
  list: 'todos'
} as const

export function registerTodoNavigation() {
  registerNavDestinations({
    id: TODO_NAV_TAB.list,
    titleKey: 'layoutPage.todos',
    icon: AppIcons.todos,
    route: '/todos',
    order: 20
  })
}
