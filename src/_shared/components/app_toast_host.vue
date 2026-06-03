<template>
  <ClientOnly>
    <Toaster
      :position="position"
      :theme="toasterTheme"
      :duration="5000"
      close-button
      rich-colors
      class="app-toaster"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { isTheme, THEME_COOKIE_NAME } from '@core/theme/constants'

const { locale } = useI18n()
const themeCookie = useCookie<string | null>(THEME_COOKIE_NAME)

const position = computed(() =>
  locale.value === 'ar' ? 'top-left' : 'top-right'
)

const toasterTheme = computed<'light' | 'dark'>(() => {
  if (import.meta.client) {
    const dom = document.documentElement.dataset.theme
    if (isTheme(dom)) return dom
  }
  return isTheme(themeCookie.value) && themeCookie.value === 'light'
    ? 'light'
    : 'dark'
})
</script>

<style>
.app-toaster [data-sonner-toast] {
  border-radius: 0.75rem;
}
</style>
