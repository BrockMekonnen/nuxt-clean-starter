<template>
  <AuthLoginPage />
</template>

<script setup lang="ts">
import AuthLoginPage from '../modules/auth/features/login/page/login_page.vue'

definePageMeta({
  layout: 'default',
  middleware: 'guest',
  guestOnly: true
})
</script>

