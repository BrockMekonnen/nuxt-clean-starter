# Nuxt Clean Starter

Modular clean-architecture starter aligned with [flutter_clean_starter](https://github.com/BrockMekonnen/flutter_clean_starter) and [go-clean-starter](https://github.com/BrockMekonnen/go-clean-starter).

- **Domain / data** — `tsyringe` DI, use cases, repositories
- **App state** — [Pinia](https://pinia.vuejs.org/) stores per module (see [docs/state-management.md](./docs/state-management.md))
- **UI** — Nuxt pages, composable facades, Tailwind v4, [adaptive layout](./docs/adaptive-layout.md)

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
# nuxt-clean-starter
