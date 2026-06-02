<template>
  <div class="mx-auto w-full max-w-xl space-y-4">
    <section
      class="rounded-2xl border border-border/10 bg-surface/30 p-5 md:bg-surface/50"
    >
      <h2 class="mb-4 text-sm font-medium text-muted">
        {{ t('settingsPage.appearance') }}
      </h2>
      <div class="flex flex-wrap items-center gap-4">
        <ClientOnly>
          <ThemeModeButton />
          <LanguageChangeButton />
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import LanguageChangeButton from '../../../components/language_change_button.vue'
import ThemeModeButton from '../../../components/theme_mode_button.vue'

const { t } = useI18n()
</script>
