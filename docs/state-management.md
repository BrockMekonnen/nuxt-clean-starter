# State management

This starter uses a **layered** approach that scales from small apps to large modular codebases. For folder layout and import rules, see [architecture.md](./architecture.md).

## Layers

| Layer         | Tool                             | Responsibility                                      |
| ------------- | -------------------------------- | --------------------------------------------------- |
| **Domain**    | `tsyringe` (`$di`)               | Repositories, use cases — stateless, testable       |
| **App state** | **Pinia**                        | Session, feature UI state, cross-route shared state |
| **UI API**    | Composables (`useAuth`, …)       | Stable facade for pages; can wrap stores            |
| **Local UI**  | `ref` / `reactive` in components | Form fields, toggles, one-off view state            |

This mirrors the Flutter starter: **Bloc/Cubit** ≈ Pinia stores, **GetIt** ≈ `tsyringe`.

## When to use what

- **Pinia store** — shared across routes/components, survives navigation, needs devtools or clear module ownership (e.g. `auth`, `cart`, `notifications`).
- **Composable only** — thin helper with no shared state, or wrapping a store (`useAuth`).
- **Component `ref`** — validation errors, open/closed modals, input values.

## User feedback (errors & toasts)

| Situation                                | Pattern                            | Example                      |
| ---------------------------------------- | ---------------------------------- | ---------------------------- |
| Field validation                         | Inline under the input             | Login email/password         |
| Async action failure (API, store action) | `useAppNotification().showError()` | Login/register/todo failures |
| Global / persistent condition            | Top banner in `app.vue`            | `network_offline_banner.vue` |
| Page context the user must read          | Inline alert on the page           | “Account created” on login   |

Stores may still set `errorMessage` for tests; pages show toasts in `catch` via `failureMessage(err)` (same idea as Flutter `BlocListener` + `CustomToast`).

Avoid putting business rules in stores: call **use cases** from store actions (see `auth.store.ts`).

## Module layout

```
modules/<feature>/
  domain/
  data/
  stores/          # Pinia (feature app state)
  features/
    <screen>/
      composables/ # optional UI facades
      page/
```

Core cross-cutting state lives under `src/_core/stores/` (e.g. network).

## Auth example

- Store: `modules/auth/stores/auth.store.ts`
- Hydration: `plugins/auth.ts` runs `callOnce('auth:bootstrap', …)` so the session restores on SSR and dedupes on the client. Token lives in a **cookie**; user profile may be cached in **localStorage** on the client for faster reloads (see `data/auth_persistence.ts`).
- Facade: `useAuth()` for pages that prefer composables

## Route guards

Use middleware with the store:

```ts
// middleware/auth.ts — redirects to /login?redirect=<path> (see auth-and-routing.md)
export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.requiresAuth) return
  // ...
})
```

Set `definePageMeta({ requiresAuth: true })` on protected pages.

## Adding a new feature store

1. Create `modules/<feature>/stores/<feature>.store.ts` with `defineStore`.
2. Register actions that resolve use cases via `$di`.
3. Expose a composable if you want a consistent import path for pages.
4. Keep persistence explicit (plugin, cookie, or `pinia-plugin-persistedstate` if you add it later).

## Optional upgrades (large projects)

See [large-apps.md](./large-apps.md) for when and how to add:

- httpOnly auth cookies, `pinia-plugin-persistedstate`, **@pinia/colada**
- SSR data fetching (`useAsyncData`, `callOnce`)
- Nuxt layers, i18n URL strategies, production modules

Do not replace `tsyringe` with Pinia for services; keep DI for constructor injection and unit tests.
