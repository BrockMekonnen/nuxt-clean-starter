<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/15 bg-surface text-text transition hover:border-border/30"
    :title="t('layoutPage.changeTheme')"
    :aria-label="t('layoutPage.changeTheme')"
    @click="toggleTheme"
  >
    <AppIcon
      :name="isDark ? AppIcons.themeLight : AppIcons.themeDark"
      size="1.25rem"
    />
  </button>
</template>

<script setup lang="ts">
import { AppIcons } from '@core/icons/app_icons'
import AppIcon from './app_icon.vue'

const { t } = useI18n()
const nuxtApp = useNuxtApp()

const isDark = ref(
  import.meta.client
    ? document.documentElement.dataset.theme !== 'light'
    : true
)

onMounted(() => {
  isDark.value = nuxtApp.$theme?.get() === 'dark'
})

function toggleTheme() {
  nuxtApp.$theme?.toggle()
  isDark.value = nuxtApp.$theme?.get() === 'dark'
}
</script>
