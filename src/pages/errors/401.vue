<template>
  <div class="mx-auto max-w-md py-16 text-center">
    <p class="text-5xl font-bold text-primary">401</p>
    <h1 class="mt-4 text-xl font-semibold">
      {{ t('errorPage.unauthorizedTitle') }}
    </h1>
    <p class="mt-2 text-muted">{{ t('errorPage.unauthorizedMessage') }}</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <NuxtLink
        to="/login"
        class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-105"
      >
        {{ t('loginPage.signIn') }}
      </NuxtLink>
      <NuxtLink
        to="/"
        class="rounded-xl border border-border/15 px-5 py-2.5 text-sm font-semibold hover:border-border/30"
      >
        {{ t('layoutPage.home') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { t } = useI18n()
</script>
