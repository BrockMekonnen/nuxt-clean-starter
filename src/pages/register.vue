<template>
  <RegisterForm />
</template>

<script setup lang="ts">
import RegisterForm from '../modules/auth/features/register/page/register_form.vue'

definePageMeta({
  layout: 'default',
  middleware: 'guest',
  guestOnly: true
})
</script>
