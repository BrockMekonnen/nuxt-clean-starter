<template>
  <NuxtRouteAnnouncer />
  <NetworkOfflineBanner />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { isTheme, THEME_COOKIE_NAME } from '@core/theme/constants'
import NetworkOfflineBanner from '@shared/components/network_offline_banner.vue'

const { locale } = useI18n()
const themeCookie = useCookie<string | null>(THEME_COOKIE_NAME)

const dir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

/** SSR: render the correct `data-theme` when a cookie exists (avoids wrong tokens in HTML). */
const dataTheme = computed(() =>
  isTheme(themeCookie.value) ? themeCookie.value : undefined
)

useHead({
  htmlAttrs: {
    dir,
    lang: locale,
    'data-theme': dataTheme
  }
})
</script>
