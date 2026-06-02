<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const dir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

useHead({
  htmlAttrs: {
    dir,
    lang: locale
  }
})
</script>
