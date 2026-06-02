import { initNavigation } from './layout/init_navigation'
import { registerAuthModule } from '@modules/auth/auth_module'
import type { DependencyContainer } from 'tsyringe'

export function initBeforeAppRun(di: DependencyContainer) {
  initNavigation()
  registerAuthModule(di)
}
