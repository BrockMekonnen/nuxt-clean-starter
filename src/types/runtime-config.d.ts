declare module 'nuxt/schema' {
  interface RuntimeConfig {
    apiUpstream: string
  }

  interface PublicRuntimeConfig {
    apiBase: string
  }
}

export {}
