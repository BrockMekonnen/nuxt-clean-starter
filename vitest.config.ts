import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

const srcRoot = fileURLToPath(new URL('./src', import.meta.url))

// Pure domain/data tests run in `node`; tests that need Nuxt auto-imports or a
// component runtime opt into the `nuxt` environment with a per-file docblock:
//   // @vitest-environment nuxt
export default defineVitestConfig({
  resolve: {
    alias: {
      '@core': `${srcRoot}/_core`,
      '@shared': `${srcRoot}/_shared`,
      '@modules': `${srcRoot}/modules`
    }
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts']
  }
})
