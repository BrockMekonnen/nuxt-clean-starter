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

        <div class="flex flex-wrap items-center justify-end gap-2 text-sm text-muted">
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
          <select
            v-model="locale"
            class="rounded-xl border border-border/15 bg-surface px-2 py-1.5 text-text hover:border-border/25"
            aria-label="Language"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
            <option value="zh">ZH</option>
            <option value="es">ES</option>
          </select>
          <button
            type="button"
            class="rounded-xl border border-border/15 bg-surface px-3 py-1.5 text-text hover:border-border/25"
            :title="t('nav.toggleTheme')"
            @click="$theme.toggle()"
          >
            {{ t('nav.toggleTheme') }}
          </button>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
</script>
