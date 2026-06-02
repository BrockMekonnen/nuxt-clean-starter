<template>
  <LandingPage />
</template>

<script setup lang="ts">
import LandingPage from '@shared/features/landing/page/landing_page.vue'

definePageMeta({
  layout: 'landing',
  middleware: 'guest',
  guestOnly: true
})
</script>
