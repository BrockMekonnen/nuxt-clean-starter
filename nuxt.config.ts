// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

const srcRoot = fileURLToPath(new URL('./src', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  // Nuxt scans `src/plugins/`; explicit list guarantees load order (http → di → network).
  plugins: [
    '~/plugins/http.ts',
    '~/plugins/theme.ts',
    '~/plugins/10.di.ts',
    '~/plugins/network.client.ts',
    '~/plugins/auth.client.ts'
  ],
  modules: ['@nuxt/icon', '@pinia/nuxt', '@nuxtjs/i18n'],
  icon: {
    serverBundle: {
      collections: ['mdi']
    }
  },
  pinia: {
    storesDirs: ['_core/stores/**', 'modules/**/stores/**']
  },
  alias: {
    '@core': `${srcRoot}/_core`,
    '@shared': `${srcRoot}/_shared`,
    '@modules': `${srcRoot}/modules`
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://0.0.0.0:9090/api'
    }
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },
  css: ['@core/theme/main.css'],
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    lazy: true,
    // Keep translations in Nuxt's conventional `src/i18n/` folder.
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'zh', name: '中文', file: 'zh.json' },
      { code: 'es', name: 'Español', file: 'es.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  imports: {
    dirs: ['_core/**', '_shared/**', 'modules/**/features/**/composables']
  },
  typescript: {
    tsConfig: {
      include: ['src/types/**/*.d.ts'],
      compilerOptions: {
        paths: {
          '@core/*': ['../src/_core/*'],
          '@shared/*': ['../src/_shared/*'],
          '@modules/*': ['../src/modules/*']
        }
      }
    }
  }
})
