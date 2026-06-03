# Nuxt Clean Starter

Modular clean-architecture starter aligned with [flutter_clean_starter](https://github.com/BrockMekonnen/flutter_clean_starter) and [go-clean-starter](https://github.com/BrockMekonnen/go-clean-starter).

- **Architecture** — [docs/architecture.md](./docs/architecture.md) (layers, dependency rules, adding modules)
- **Scaling** — [docs/large-apps.md](./docs/large-apps.md) (Nuxt layers, SSR data, auth/i18n/production options)
- **Domain / data** — `tsyringe` DI, use cases, repositories
- **App state** — [Pinia](https://pinia.vuejs.org/) stores per module (see [docs/state-management.md](./docs/state-management.md))
- **UI** — Nuxt pages, composable facades, Tailwind v4, [adaptive layout](./docs/adaptive-layout.md), [@nuxt/icon](https://nuxt.com/modules/icon) (MDI)
- **Contributing** — [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Auth & routing** — [docs/auth-and-routing.md](./docs/auth-and-routing.md)

In **development**, login/register forms pre-fill demo credentials for the Go API (`jane.doe@test.com` / `test@test12`). Production builds use empty fields.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) for framework basics.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Quality checks

```bash
npm run typecheck   # tsc against the Nuxt-generated config
npm run lint        # ESLint (flat config via @nuxt/eslint) + import-alias enforcement
npm run format      # Prettier write (use format:check in CI)
npm run test        # Vitest (watch via test:watch)
```

CI runs the same checks on push/PR (see `.github/workflows/ci.yml`), plus `depcruise` and Playwright e2e. After `npm install`, Husky runs lint-staged on commit.

```bash
npm run depcruise   # layer dependency rules
npm run build && npm run test:e2e   # Playwright preview (mocks auth API)
```

API BFF proxy: [docs/api-proxy.md](./docs/api-proxy.md).

- **Imports** must use the `@core` / `@shared` / `@modules` aliases for cross-layer
  references; deep relative imports are blocked by ESLint.
- **Tests** live in `__tests__/` next to the code. Pure domain/data tests run in the
  `node` environment; tests needing Nuxt auto-imports add a `// @vitest-environment nuxt`
  docblock and use `mockNuxtImport` (see `modules/auth/__tests__/`).

## Template backlog

Tracked improvements (architecture review, CI, docs): [docs/template-improvements.md](./docs/template-improvements.md).

## Adding a module

Copy **`src/modules/auth/`** or the smaller **`src/modules/todo/`** (local persistence, no API). Full conventions: [docs/architecture.md](./docs/architecture.md).

| Step | Action                                                                                                          |
| ---- | --------------------------------------------------------------------------------------------------------------- |
| 1    | Create `src/modules/<feature>/` with `domain/`, `data/`, `stores/`, `features/`, `__tests__/`                   |
| 2    | **Domain** — repository interface, entities, `<Feature>Usecases` (throw `ValidationFailure` for invalid input)  |
| 3    | **Data** — `*RepositoryImpl`, DTOs/mappers; use `ApiError.from` for HTTP errors                                 |
| 4    | **Tokens** — `<feature>_tokens.ts` (tsyringe symbols)                                                           |
| 5    | **DI** — `register<Feature>Module(di)` in `<feature>_module.ts`, then call it from `src/_core/_init_modules.ts` |
| 6    | **Store** — `stores/<feature>.store.ts`; actions resolve use cases via `$di`, not `$http`                       |
| 7    | **Composable** (optional) — `features/<screen>/composables/use<Feature>.ts`                                     |
| 8    | **UI** — Vue screens under `features/<screen>/page/`                                                            |
| 9    | **Routes** — thin `src/pages/<route>.vue` (layout, `middleware`, `definePageMeta`) importing feature pages      |
| 10   | **Nav** (if in app shell) — `<feature>_nav.ts` + register in `src/_core/layout/init_navigation.ts`              |
| 11   | **i18n** — add keys to `i18n/locales/en.json` (and `ar`, `es`, `zh` for parity)                                 |
| 12   | **Tests** — `__tests__/` for use cases and repository; `// @vitest-environment nuxt` for store tests if needed  |
