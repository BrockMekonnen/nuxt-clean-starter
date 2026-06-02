<template>
  <SettingsPage />
</template>

<script setup lang="ts">
import SettingsPage from '../_shared/features/settings/page/settings_page.vue'
import { SHARED_NAV_TAB } from '../_shared/shared_nav'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
  navTab: SHARED_NAV_TAB.settings,
  appTitle: 'settingsPage.title',
  requiresAuth: true
})
</script>
