// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'

// Polyfill for Node < 21: `@nuxt/eslint`'s flat-config-utils uses Object.groupBy.
// Runs before ESLint composes the config (`toConfigs`), so it takes effect.
if (typeof (/** @type {any} */ (Object).groupBy) !== 'function') {
  /** @type {any} */ Object.groupBy = (
    /** @type {Iterable<any>} */ items,
    /** @type {(item: any, index: number) => PropertyKey} */ keyFn
  ) => {
    /** @type {Record<PropertyKey, any[]>} */
    const result = {}
    let index = 0
    for (const item of items) {
      const key = keyFn(item, index++)
      ;(result[key] ??= []).push(item)
    }
    return result
  }
}

export default withNuxt(
  {
    rules: {
      // Enforce path aliases over deep relative imports across layer roots.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/_core/**', '**/_shared/**', '**/modules/**'],
              message:
                'Use the @core / @shared / @modules aliases instead of deep relative imports.'
            }
          ]
        }
      ]
    }
  },
  // Keep ESLint and Prettier from fighting over formatting.
  prettier
)
