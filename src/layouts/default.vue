<template>
  <div class="min-h-screen bg-bg text-text">
    <header
      class="sticky top-0 z-10 border-b border-border/10 bg-bg/70 backdrop-blur"
    >
      <nav
        class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3"
      >
        <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo size="2.25rem" />
          <AppName custom-class="hidden sm:inline" />
        </NuxtLink>

        <div
          class="flex flex-wrap items-center justify-end gap-2 text-sm text-muted"
        >
          <NuxtLink
            to="/login"
            class="rounded-xl border border-border/15 bg-surface px-3 py-1.5 hover:border-border/25 hover:text-text"
            :title="t('loginPage.signIn')"
          >
            {{ t('loginPage.signIn') }}
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="rounded-xl border border-border/15 bg-surface px-3 py-1.5 hover:border-border/25 hover:text-text"
            :title="t('registerPage.signUp')"
          >
            {{ t('registerPage.signUp') }}
          </NuxtLink>
          <ClientOnly>
            <div class="flex items-center gap-2">
              <LanguageChangeButton />
              <ThemeModeButton />
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
import AppLogo from '@shared/components/app_logo.vue'
import AppName from '@shared/components/app_name.vue'
import LanguageChangeButton from '@shared/components/language_change_button.vue'
import ThemeModeButton from '@shared/components/theme_mode_button.vue'

const { t } = useI18n()
</script>
