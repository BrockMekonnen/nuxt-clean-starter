import { registerAuthNavigation } from '@modules/auth/auth_nav'
import { registerTodoNavigation } from '@modules/todo/todo_nav'
import { registerSharedNavigation } from '@shared/shared_nav'

let initialized = false

/** Call once at app bootstrap (see `_init_modules.ts`). Safe if the DI plugin runs on SSR and client. */
export function initNavigation() {
  if (initialized) return
  initialized = true
  registerSharedNavigation()
  registerTodoNavigation()
  registerAuthNavigation()
}
