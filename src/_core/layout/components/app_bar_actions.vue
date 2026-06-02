<template>
  <div class="flex items-center gap-2">
    <ClientOnly>
      <ThemeModeButton />
      <LanguageChangeButton />
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/15 bg-surface text-text transition hover:border-border/30"
        :title="t('layoutPage.logout')"
        :aria-label="t('layoutPage.logout')"
        @click="onLogout"
      >
        <AppIcon :name="AppIcons.logout" size="1.25rem" />
      </button>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { AppIcons } from '../../icons/app_icons'
import AppIcon from '../../../_shared/components/app_icon.vue'
import LanguageChangeButton from '../../../_shared/components/language_change_button.vue'
import ThemeModeButton from '../../../_shared/components/theme_mode_button.vue'

const { t } = useI18n()
const auth = useAuthStore()

async function onLogout() {
  await auth.logout()
  await navigateTo('/', { replace: true })
}
</script>
