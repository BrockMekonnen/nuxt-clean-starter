import { initNavigation } from './layout/init_navigation'
import { registerAuthModule } from '@modules/auth/auth_module'
import { registerTodoModule } from '@modules/todo/todo_module'
import type { DependencyContainer } from 'tsyringe'

export function initBeforeAppRun(di: DependencyContainer) {
  initNavigation()
  registerAuthModule(di)
  registerTodoModule(di)
}
