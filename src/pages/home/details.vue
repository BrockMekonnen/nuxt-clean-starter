<template>
  <HomeDetailsPage />
</template>

<script setup lang="ts">
import HomeDetailsPage from '@shared/features/home/page/home_details_page.vue'
import { SHARED_NAV_TAB } from '@shared/shared_nav'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
  navTab: SHARED_NAV_TAB.home,
  appTitle: 'homeDetailsPage.title',
  showAppBarBack: true,
  backTo: '/home',
  requiresAuth: true,
  hideNavOnMobile: true
})
</script>
