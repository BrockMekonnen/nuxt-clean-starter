<template>
  <div class="min-h-screen bg-bg text-text">
    <header class="sticky top-0 z-10 border-b border-border/10 bg-bg/70 backdrop-blur">
      <nav class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold tracking-tight">
          <span
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary"
            aria-hidden="true"
          >
            N
          </span>
          <span class="hidden sm:inline">{{ t('app.title') }}</span>
        </NuxtLink>

        <div class="flex flex-wrap items-center justify-end gap-2">
          <NuxtLink
            to="/login"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/15 bg-surface text-text transition hover:border-border/30"
            :title="t('loginPage.signIn')"
          >
            <AppIcon :name="AppIcons.login" size="1.25rem" />
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/15 bg-surface text-text transition hover:border-border/30"
            :title="t('registerPage.signUp')"
          >
            <AppIcon :name="AppIcons.register" size="1.25rem" />
          </NuxtLink>
          <ClientOnly>
            <div class="flex items-center gap-2">
              <ThemeModeButton />
              <LanguageChangeButton />
            </div>
          </ClientOnly>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { AppIcons } from '../_core/icons/app_icons'
import AppIcon from '../_shared/components/app_icon.vue'
import LanguageChangeButton from '../_shared/components/language_change_button.vue'
import ThemeModeButton from '../_shared/components/theme_mode_button.vue'

const { t } = useI18n()
</script>
