<template>
  <ProfilePage />
</template>

<script setup lang="ts">
import ProfilePage from '../modules/auth/features/profile/page/profile_page.vue'
import { AUTH_NAV_TAB } from '../modules/auth/auth_nav'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
  navTab: AUTH_NAV_TAB.profile,
  appTitle: 'profilePage.title',
  requiresAuth: true
})
</script>
