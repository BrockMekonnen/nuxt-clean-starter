<template>
  <section class="mx-auto max-w-md rounded-2xl border border-border/10 bg-surface/20 p-6 text-center">
    <h1 class="text-xl font-bold">{{ t('registerPage.signUp') }}</h1>
    <p class="mt-2 text-sm text-muted">
      Registration module coming soon. Use login for the demo auth flow.
    </p>
    <NuxtLink
      to="/login"
      class="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
    >
      {{ t('loginPage.signIn') }}
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
