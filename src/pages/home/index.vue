<template>
  <HomePage />
</template>

<script setup lang="ts">
import HomePage from '@shared/features/home/page/home_page.vue'
import { SHARED_NAV_TAB } from '@shared/shared_nav'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
  navTab: SHARED_NAV_TAB.home,
  appTitle: 'homePage.title',
  requiresAuth: true
})
</script>
