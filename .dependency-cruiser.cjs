/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-not-to-data',
      severity: 'error',
      comment: 'Domain must not import the data layer',
      from: { path: '^src/modules/[^/]+/domain/' },
      to: { path: '^src/modules/[^/]+/data/' }
    },
    {
      name: 'domain-not-to-features',
      severity: 'error',
      comment: 'Domain must not import presentation',
      from: { path: '^src/modules/[^/]+/domain/' },
      to: { path: '^src/modules/[^/]+/features/' }
    },
    {
      name: 'domain-not-to-stores',
      severity: 'error',
      comment: 'Domain must not import Pinia stores',
      from: { path: '^src/modules/[^/]+/domain/' },
      to: { path: '^src/modules/[^/]+/stores/' }
    },
    {
      name: 'data-not-to-features',
      severity: 'error',
      comment: 'Data must not import presentation',
      from: { path: '^src/modules/[^/]+/data/' },
      to: { path: '^src/modules/[^/]+/features/' }
    },
    {
      name: 'data-not-to-stores',
      severity: 'error',
      comment: 'Data must not import Pinia stores',
      from: { path: '^src/modules/[^/]+/data/' },
      to: { path: '^src/modules/[^/]+/stores/' }
    },
    {
      name: 'features-not-to-data',
      severity: 'error',
      comment: 'UI must use stores/composables, not repositories',
      from: { path: '^src/modules/[^/]+/features/' },
      to: { path: '^src/modules/[^/]+/data/' }
    },
    {
      name: 'stores-not-to-data',
      severity: 'error',
      comment: 'Stores call use cases via DI, not repositories',
      from: { path: '^src/modules/[^/]+/stores/' },
      to: { path: '^src/modules/[^/]+/data/' }
    },
    {
      name: 'core-not-to-modules',
      severity: 'error',
      comment: '_core must stay independent of feature modules',
      from: { path: '^src/_core/' },
      to: { path: '^src/modules/' }
    }
  ],
  options: {
    doNotFollow: {
      path: ['node_modules', '.nuxt', '.output', 'dist', 'coverage']
    }
  }
}
