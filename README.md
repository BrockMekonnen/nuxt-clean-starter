# Nuxt Clean Starter

Modular clean-architecture starter aligned with [flutter_clean_starter](https://github.com/BrockMekonnen/flutter_clean_starter) and [go-clean-starter](https://github.com/BrockMekonnen/go-clean-starter).

- **Domain / data** — `tsyringe` DI, use cases, repositories
- **App state** — [Pinia](https://pinia.vuejs.org/) stores per module (see [docs/state-management.md](./docs/state-management.md))
- **UI** — Nuxt pages, composable facades, Tailwind v4, [adaptive layout](./docs/adaptive-layout.md), [@nuxt/icon](https://nuxt.com/modules/icon) (MDI)

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

- **Imports** must use the `@core` / `@shared` / `@modules` aliases for cross-layer
  references; deep relative imports are blocked by ESLint.
- **Tests** live in `__tests__/` next to the code. Pure domain/data tests run in the
  `node` environment; tests needing Nuxt auto-imports add a `// @vitest-environment nuxt`
  docblock and use `mockNuxtImport` (see `modules/auth/__tests__/`).

## Adding a module

1. Create `src/modules/<feature>/{domain,data,stores,features}` (mirror `modules/auth`).
2. Define tokens in `<feature>_tokens.ts` and a `register<Feature>Module(di)` factory.
3. Wire it into `src/_core/_init_modules.ts`.
4. Register nav destinations in `<feature>_nav.ts` and add it to `init_navigation.ts`.
