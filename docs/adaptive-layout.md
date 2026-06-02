# Adaptive layout

Responsive shell aligned with the Flutter starter’s `AdaptiveLayout` / `PageLayout`.

## Breakpoints (Tailwind)

| Viewport | Navigation |
|----------|------------|
| **&lt; md** (mobile) | Bottom bar (+ overflow drawer if &gt;5 items) |
| **md – lg** (tablet) | Collapsed side rail + overlay drawer |
| **≥ lg** (desktop) | Permanent side nav (expand/collapse) |

## Register navigation from a module

```ts
// modules/my_feature/my_nav.ts
import { registerNavDestinations } from '@core/layout/navigation_registry'

export const MY_NAV_TAB = { list: 'my-list' } as const

export function registerMyFeatureNavigation() {
  registerNavDestinations({
    id: MY_NAV_TAB.list,
    titleKey: 'layoutPage.myList',
    icon: '📋',
    route: '/my-list',
    order: 20
  })
}
```

Call your `register*Navigation()` from `_core/layout/init_navigation.ts` (same idea as Flutter’s `getNavRoutes()` / DI).

## Protected app pages

```vue
<!-- pages/my-page.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
  requiresAuth: true,
  navTab: 'home',
  appTitle: 'homePage.title'
})
</script>
```

## Guest-only routes (landing, login)

```ts
definePageMeta({
  middleware: 'guest',
  guestOnly: true
})
```

## Files

- `_core/layout/navigation_registry.ts` — destination list
- `_core/layout/components/adaptive_layout.vue` — shell
- `_core/stores/navigation.store.ts` — drawer expanded / mobile drawer
- `layouts/app.vue` — layout wrapper for authenticated app
