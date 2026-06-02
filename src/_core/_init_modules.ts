import { registerAuthModule } from '../modules/auth/auth_module'
import type { DependencyContainer } from 'tsyringe'

export function initBeforeAppRun(di: DependencyContainer) {
  registerAuthModule(di)
}

