# Large-app options

Guidance for growing **nuxt-clean-starter** beyond a single app repo. Nothing here is required for day one — adopt when you hit the triggers below.

Related: [architecture](./architecture.md), [state management](./state-management.md), [API proxy](./api-proxy.md).

---

## When to adopt Nuxt layers

[Nuxt layers](https://nuxt.com/docs/getting-started/layers) let you compose multiple Nuxt configs (shared UI, i18n, design tokens) into one app.

### Good fit

- **Monorepo** with `apps/web`, `apps/admin`, and `packages/ui-layer` sharing layout and theme
- **Design system** published as a layer (`@org/nuxt-ui`) consumed by product apps
- **Multi-brand** sites that differ only in theme, nav, and a few pages
- Teams want independent versioning of “platform” vs “product” code

### Stay in one repo (no layers) when

- One product, one deployable, &lt; ~30 feature modules
- Shared code is already organized under `src/_core`, `src/_shared`, `src/modules`

### Suggested split if you add layers

| Layer         | Contents                                                         |
| ------------- | ---------------------------------------------------------------- |
| `layers/base` | `_core` (DI, HTTP, theme, layout shell), ESLint/tsconfig extends |
| `layers/i18n` | `i18n/locales`, `@nuxtjs/i18n` defaults                          |
| `apps/main`   | `modules/*`, `pages/*`, app-specific `nuxt.config`               |

```ts
// apps/main/nuxt.config.ts
export default defineNuxtConfig({
  extends: ['../../layers/base', '../../layers/i18n']
})
```

Keep **domain modules** (`modules/auth`, `modules/todo`) in the app layer unless multiple apps need the same bounded context.

---

## SSR data fetching

This starter is **session-first** (auth bootstrap via `callOnce` in `plugins/auth.ts`). For **public or SEO-critical** pages that load server data, use Nuxt’s data APIs and keep clean architecture boundaries.

### Pattern: page → composable → use case (server) or repository

1. **Thin page** — `definePageMeta`, layout, optional `useAsyncData` key
2. **Composable or page setup** — calls `useAsyncData` / `useFetch`
3. **Server path** — resolve use cases from `$di` inside the handler (not in Vue SFCs directly long-term; a small `server/api` or server-only composable wrapper is fine)
4. **Client navigation** — same key + `callOnce` to avoid double fetch when SSR already populated the payload

### Example: public list (sketch)

```vue
<!-- pages/blog/index.vue -->
<script setup lang="ts">
const { data, pending, error } = await useAsyncData(
  'blog:list',
  () => useBlogList() // composable wraps $fetch or use case on server
)
</script>
```

```ts
// features/list/composables/useBlogList.ts
export async function useBlogList() {
  const { $di } = useNuxtApp()
  const usecases = $di.resolve(BLOG_TOKENS.BlogUsecases)
  return await usecases.listPublished()
}
```

Use **`callOnce`** when the same data must not refetch on client after SSR (same idea as auth):

```ts
await callOnce('blog:list', () => useBlogList())
```

### When to use what

| API            | Use for                                                              |
| -------------- | -------------------------------------------------------------------- |
| `useAsyncData` | SSR + cache by key, full control over fetcher                        |
| `useFetch`     | HTTP calls with less boilerplate (wraps `useAsyncData`)              |
| `callOnce`     | Dedupe SSR → client (auth bootstrap, expensive public data)          |
| Pinia store    | Cross-route **client** state after hydration, not primary SSR loader |

### Keep boundaries

- Do not put `$fetch` in `domain/` or raw Vue components for business lists
- Prefer use cases in the fetcher; map errors with `failureMessage` / `ApiError` in the store or composable

---

## Auth and app-state upgrades

Current behavior (see `modules/auth/data/auth_persistence.ts`):

- **Token** — cookie (`auth_token`), readable on server for SSR and BFF
- **User cache** — `localStorage` on client only (fast reload)
- **Bootstrap** — `plugins/auth.ts` + `callOnce('auth:bootstrap', …)`

### httpOnly session cookies (recommended for production)

**Why:** JS cannot read the token → smaller XSS blast radius.

**Approach:**

1. Login via **server route** (e.g. `server/api/auth/login.post.ts`) that calls upstream, then `setCookie(event, 'auth_token', token, { httpOnly: true, secure: true, sameSite: 'lax' })`
2. Remove token from client-readable cookie in `auth_persistence.ts`; keep only non-sensitive UI prefs client-side
3. BFF proxy forwards cookie on server-side `$fetch` automatically; client `HttpClient` may only need cookies on same-origin `/api`

`plugins/http.ts` already attaches `Authorization` from cookie when present — switch to cookie-only server forwarding when httpOnly.

### pinia-plugin-persistedstate

Use when several stores need declarative sync to `localStorage` / `sessionStorage`:

```bash
npm install pinia-plugin-persistedstate
```

```ts
// plugins/pinia-persisted.client.ts
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(piniaPluginPersistedstate)
})
```

Do **not** persist secrets or tokens in persisted state. Prefer the auth cookie pattern above.

### @pinia/colada

Use for **query-heavy** features (paginated lists, filters, background refresh) while keeping **tsyringe** for write paths and domain rules.

- **Colada** — cache, stale time, mutations, deduped queries in the UI layer
- **Usecases + repositories** — still own business rules and API mapping

```bash
npm install @pinia/colada
```

Wire per [Colada docs](https://pinia-colada.esm.dev/); call use cases inside `query`/`mutation` functions, not raw HTTP from components.

**Rule:** Do not replace `tsyringe` with Pinia for services — see [state-management.md](./state-management.md).

---

## i18n URL strategy (SEO)

**Current:** `strategy: 'no_prefix'` — locale in cookie / browser detection, URLs stay `/home`, `/login` (good for apps behind login, simpler routing).

**When you need locale in the URL** (public marketing, hreflang, shared links per language):

```ts
// nuxt.config.ts — example
i18n: {
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' }
    // ...
  ]
}
```

| Strategy                | URLs                       | Best for                               |
| ----------------------- | -------------------------- | -------------------------------------- |
| `no_prefix`             | `/about`                   | Authenticated apps, locale from cookie |
| `prefix`                | `/en/about`, `/ar/about`   | All locales equal for SEO              |
| `prefix_except_default` | `/about` (en), `/ar/about` | English default + prefixed others      |

After changing strategy:

- Update `nav` `route` values in `*_nav.ts` if you hardcode paths (or use `localePath()` in templates)
- Add `@nuxtjs/sitemap` + `hreflang` when shipping public SEO (see below)
- Re-test RTL (`dir: 'rtl'`) on prefixed routes

---

## Optional production modules

Add when you have a concrete need — not included in the starter to keep dependencies minimal.

### @nuxt/image

Optimized images, lazy loading, CDN providers.

```bash
npx nuxi module add image
```

Use in feature pages instead of raw `<img>` for content-heavy UIs.

### nuxt-security

Security headers (CSP, HSTS, etc.).

```bash
npx nuxi module add security
```

Tune CSP for your inline theme script in `nuxt.config.ts` (`theme-init`) if you enable strict CSP.

### SEO and sitemap

For marketing pages + i18n prefixes:

```bash
npx nuxi module add @nuxtjs/sitemap
```

Combine with `site.url` in config and locale-aware routes. App-shell-only products may skip this.

### Observability (e.g. Sentry)

Client + server error tracking, release health.

```bash
npx nuxi module add @sentry/nuxt/module
```

Configure DSN via env; filter PII in `beforeSend`. Useful when the template grows to many modules and SSR paths.

### Summary

| Module            | Add when                            |
| ----------------- | ----------------------------------- |
| `@nuxt/image`     | Many user/media assets, LCP matters |
| `nuxt-security`   | Production hardening / compliance   |
| `@nuxtjs/sitemap` | Public SEO + localized URLs         |
| `@sentry/nuxt`    | Need prod error/session replay      |

---

## Checklist before “going large”

- [ ] Modules stay behind `domain` / `data` / `stores` / `features`
- [ ] `npm run depcruise` clean in CI
- [ ] BFF or direct API documented per environment ([api-proxy.md](./api-proxy.md))
- [ ] SSR data uses `useAsyncData` + `callOnce` where duplicate fetch hurts
- [ ] Auth tokens not exposed to JS if threat model requires it
- [ ] i18n strategy matches SEO vs app-only requirements
