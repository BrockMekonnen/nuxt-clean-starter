# Contributing

Thanks for improving **nuxt-clean-starter**. This repo is a template for large Nuxt apps using modular clean architecture.

Read [docs/architecture.md](./docs/architecture.md) before adding features. For scaling patterns (layers, SSR, production modules), see [docs/large-apps.md](./docs/large-apps.md).

---

## Prerequisites

- **Node.js** ≥ 22 (see `.nvmrc` and `package.json` `engines`)
- npm (or pnpm/yarn/bun — adjust commands if you use another package manager)

```bash
npm install
cp .env.example .env   # optional: point NUXT_PUBLIC_API_BASE at your API
```

`npm install` enables **Husky** pre-commit hooks (via the `prepare` script). Staged files run ESLint and Prettier through **lint-staged**.

---

## npm scripts

| Script                 | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Development server (http://localhost:3000) |
| `npm run build`        | Production build                           |
| `npm run preview`      | Preview production build locally           |
| `npm run typecheck`    | TypeScript check (Nuxt-generated tsconfig) |
| `npm run lint`         | ESLint                                     |
| `npm run lint:fix`     | ESLint with auto-fix                       |
| `npm run format`       | Prettier write                             |
| `npm run format:check` | Prettier check (use in CI)                 |
| `npm run test`         | Vitest (single run)                        |
| `npm run test:watch`   | Vitest watch mode                          |

Run before opening a PR:

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test && npm run depcruise && npm run build
```

Optional before merge (also runs in CI):

```bash
npm run build && npm run test:e2e
```

Playwright mocks the auth API in the **browser** only. E2e covers login → home; guest middleware is covered by `src/middleware/__tests__/guest.spec.ts`.

---

## Import aliases

Use path aliases for anything that crosses `_core`, `_shared`, or `modules`:

| Alias        | Maps to         |
| ------------ | --------------- |
| `@core/*`    | `src/_core/*`   |
| `@shared/*`  | `src/_shared/*` |
| `@modules/*` | `src/modules/*` |

Deep relative imports into those trees are **blocked by ESLint** (`no-restricted-imports` in `eslint.config.mjs`).

Within the same folder, relative imports (`./user.ts`) are fine.

---

## Where code goes

| Change                             | Location                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------ |
| New business feature               | `src/modules/<feature>/` (see [architecture.md](./docs/architecture.md)) |
| New route URL                      | `src/pages/<name>.vue` (thin wrapper)                                    |
| Shared screen used by many modules | `src/_shared/features/...`                                               |
| HTTP, DI, layout shell             | `src/_core/`                                                             |
| Route guard                        | `src/middleware/`                                                        |
| App bootstrap                      | `src/plugins/` (order matters — see `nuxt.config.ts`)                    |
| Translations                       | `i18n/locales/*.json`                                                    |
| Global types                       | `src/types/*.d.ts`                                                       |

---

## Tests

- Place tests in `__tests__/` next to the code: `*.spec.ts` or `*.test.ts`.
- Default Vitest environment is **`node`** (domain, data, pure logic).
- Tests that need Nuxt auto-imports or Pinia with Nuxt app:

  ```ts
  // @vitest-environment nuxt
  ```

- Mirror aliases in `vitest.config.ts` (`@core`, `@shared`, `@modules`).
- Reference: `src/modules/auth/__tests__/`.

Prefer testing **use cases** and **repositories** with mocks; add store tests when behavior is non-trivial.

---

## Layer discipline

- **Domain** must not import Vue, Pinia, or `data/`.
- **Stores** call **use cases**, not `HttpClient` directly.
- **Components** use composables/stores, not repositories.

See dependency table in [docs/architecture.md](./docs/architecture.md).

---

## Documentation

When you add a pattern others should copy:

- Update [docs/architecture.md](./docs/architecture.md) or the relevant doc under `docs/`.
- Mark done items in [docs/template-improvements.md](./docs/template-improvements.md) if applicable.

---

## Pull request checklist

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes (or `npm run format` on touched files)
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] `npm run depcruise` passes (module layer boundaries)
- [ ] New routes use thin `pages/` + feature `page/` components
- [ ] Cross-layer imports use `@core` / `@shared` / `@modules`
- [ ] i18n keys added for new user-visible strings (all locale files if you add keys)
- [ ] Docs updated when behavior or conventions change

---

## Backlog

Planned template work: [docs/template-improvements.md](./docs/template-improvements.md).
