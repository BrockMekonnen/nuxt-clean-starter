import { registerAuthNavigation } from '../../modules/auth/auth_nav'
import { registerSharedNavigation } from '../../_shared/shared_nav'

/** Call once at app bootstrap (see `_init_modules.ts`). */
export function initNavigation() {
  registerSharedNavigation()
  registerAuthNavigation()
}
