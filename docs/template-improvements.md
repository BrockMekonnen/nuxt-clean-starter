# Template improvements backlog

Track fixes and enhancements for **nuxt-clean-starter** as a large-project template. Check items off as they are completed.

---

## P0 — Documentation and consistency

- [x] Add [`architecture.md`](./architecture.md): layer diagram, dependency rules, `pages/` vs `modules/*/features/*/page`, how to add a module (mirror `auth`)
- [x] Fix [`state-management.md`](./state-management.md): change `plugins/auth.client.ts` → `plugins/auth.ts` (actual bootstrap plugin)
- [x] Add `CONTRIBUTING.md`: npm scripts, alias rules (`@core` / `@shared` / `@modules`), test locations, PR checklist
- [x] Extend README “Adding a module” with checklist: tokens, DI registration, nav, thin `pages/`, middleware meta, i18n keys, tests

---

## P1 — Team scale and CI

- [x] Add GitHub Actions workflow: `npm ci` → `typecheck` → `lint` → `format:check` → `test` → `build`
- [x] Add pre-commit hooks (`lint-staged` + Husky or `simple-git-hooks`) for ESLint + Prettier on staged files
- [x] Add a second reference module (e.g. minimal `todo` or flesh out `user`): domain, data, store, feature page, nav, tests

---

## P2 — Production hardening

- [x] Add `server/api` BFF proxy example to `runtimeConfig.public.apiBase` (hide upstream URL, simplify CORS)
- [x] Validate runtime config at boot/build (e.g. Zod / `nuxt-schema-zod`) for required `NUXT_PUBLIC_*` vars
- [x] Add Playwright (or Cypress) smoke tests: guest redirect, login → home
- [x] Enforce layer imports in CI (`eslint-plugin-boundaries` or `dependency-cruiser`: ban `domain` → `data`, etc.)

---

## P3 — Large-app options (document or optional)

- [x] Document when to adopt [Nuxt layers](https://nuxt.com/docs/getting-started/layers) for multi-app / monorepo splits
- [x] Document SSR data fetching pattern: `useAsyncData` / `useFetch` + `callOnce` for public/server-driven pages
- [x] Document auth upgrades: httpOnly cookies, `pinia-plugin-persistedstate`, **@pinia/colada** for query-heavy features
- [x] Document i18n URL strategy (`prefix_except_default` or similar) when SEO per locale matters
- [x] Document optional production modules: `@nuxt/image`, `nuxt-security`, SEO/sitemap, observability (e.g. Sentry)

---

## Product and DX polish

- [x] Remove or gate demo login credentials in `login_form.vue` (`import.meta.dev` or README note)
- [x] Document or implement post-register behavior (auto-login vs redirect to login)
- [x] Document protected-route UX: middleware sends to `/errors/401` vs redirect to `/login` (pick convention)
- [x] Wire `ConnectionFailure` / `network.store` into repositories or global error handling (offline-aware flows)
- [x] Replace empty `modules/user/.gitKeep` with real scaffold or rely on second sample module (see P1)

---

## Already in good shape (no action required unless you disagree)

- [x] Feature module layout: `domain` / `data` / `stores` / `features`
- [x] Thin `src/pages/` wrappers + feature UI under `modules/`
- [x] Path aliases + ESLint `no-restricted-imports` for cross-layer imports
- [x] Limited Nuxt auto-imports (composables only)
- [x] `tsyringe` child container per request (SSR-safe DI)
- [x] Auth: cookie token + `callOnce` bootstrap + Pinia store → use cases
- [x] Typed failures + `ApiError` mapping
- [x] Vitest for domain/data/store (`modules/auth/__tests__/`)
- [x] Docs: state management, adaptive layout, icons
- [x] Stack: Nuxt 4, Pinia, Tailwind 4, i18n, Node 22 + `.nvmrc`

---

## Notes

- Work through sections top to bottom, or pick one checkbox per PR.
- When an item is done, change `- [ ]` to `- [x]` and link the PR or commit in a short note below the line if helpful.
