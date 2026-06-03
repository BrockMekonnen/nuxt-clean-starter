<template>
  <div
    class="mx-auto w-full max-w-[500px] rounded-xl border border-border/15 bg-surface/30 px-8 py-10 shadow-sm md:bg-surface/50"
  >
    <form class="space-y-4" @submit.prevent="onSubmit">
      <h1 class="text-center text-2xl font-medium">
        {{ t('registerPage.signUp') }}
      </h1>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="mb-1 block text-sm text-muted">{{
            t('registerPage.firstName')
          }}</span>
          <input
            v-model="firstName"
            type="text"
            autocomplete="given-name"
            class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            :class="{ 'border-red-400/60': fieldErrors.firstName }"
          />
          <p v-if="fieldErrors.firstName" class="mt-1 text-xs text-red-400">
            {{ fieldErrors.firstName }}
          </p>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm text-muted">{{
            t('registerPage.lastName')
          }}</span>
          <input
            v-model="lastName"
            type="text"
            autocomplete="family-name"
            class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            :class="{ 'border-red-400/60': fieldErrors.lastName }"
          />
          <p v-if="fieldErrors.lastName" class="mt-1 text-xs text-red-400">
            {{ fieldErrors.lastName }}
          </p>
        </label>
      </div>

      <label class="block">
        <span class="mb-1 block text-sm text-muted">{{
          t('registerPage.phone')
        }}</span>
        <input
          v-model="phone"
          type="tel"
          autocomplete="tel"
          class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          :class="{ 'border-red-400/60': fieldErrors.phone }"
        />
        <p v-if="fieldErrors.phone" class="mt-1 text-xs text-red-400">
          {{ fieldErrors.phone }}
        </p>
      </label>

      <label class="block">
        <span class="mb-1 block text-sm text-muted">{{
          t('loginPage.emailAddress')
        }}</span>
        <input
          v-model="email"
          type="email"
          autocomplete="email"
          class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          :class="{ 'border-red-400/60': fieldErrors.email }"
        />
        <p v-if="fieldErrors.email" class="mt-1 text-xs text-red-400">
          {{ fieldErrors.email }}
        </p>
      </label>

      <label class="block">
        <span class="mb-1 block text-sm text-muted">{{
          t('loginPage.password')
        }}</span>
        <input
          v-model="password"
          type="password"
          autocomplete="new-password"
          class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          :class="{ 'border-red-400/60': fieldErrors.password }"
        />
        <p v-if="fieldErrors.password" class="mt-1 text-xs text-red-400">
          {{ fieldErrors.password }}
        </p>
      </label>

      <div>
        <label class="flex items-start gap-2 text-sm">
          <input
            v-model="agreedToTerms"
            type="checkbox"
            class="mt-1"
            :class="{
              'outline outline-1 outline-red-400/60': fieldErrors.terms
            }"
          />
          <span>{{ t('registerPage.agreeTerms') }}</span>
        </label>
        <p v-if="fieldErrors.terms" class="mt-1 text-xs text-red-400">
          {{ fieldErrors.terms }}
        </p>
      </div>

      <button
        type="submit"
        class="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white disabled:opacity-70"
        :disabled="isLoading"
      >
        {{ isLoading ? t('registerPage.signingUp') : t('registerPage.signUp') }}
      </button>

      <p class="text-center text-sm text-muted">
        {{ t('registerPage.hasAccount') }}
        <NuxtLink
          to="/login"
          class="font-semibold text-primary hover:underline"
        >
          {{ t('loginPage.signIn') }}
        </NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { failureMessage } from '@core/error/failures'

const PHONE_PATTERN = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{3,15}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const { t } = useI18n()
const notify = useAppNotification()
const { isLoading, register } = useAuth()

const firstName = ref(import.meta.dev ? 'Jane' : '')
const lastName = ref(import.meta.dev ? 'Doe' : '')
const phone = ref(import.meta.dev ? '+1 123 456 7890' : '')
const email = ref(import.meta.dev ? 'jane.doe@test.com' : '')
const password = ref(import.meta.dev ? 'test@test12' : '')
const agreedToTerms = ref(false)

const fieldErrors = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  terms: ''
})

function validate(): boolean {
  fieldErrors.firstName = ''
  fieldErrors.lastName = ''
  fieldErrors.phone = ''
  fieldErrors.email = ''
  fieldErrors.password = ''
  fieldErrors.terms = ''

  let valid = true

  if (!firstName.value.trim()) {
    fieldErrors.firstName = t('registerPage.firstNameRequired')
    valid = false
  }
  if (!lastName.value.trim()) {
    fieldErrors.lastName = t('registerPage.lastNameRequired')
    valid = false
  }

  const trimmedPhone = phone.value.trim()
  if (!trimmedPhone) {
    fieldErrors.phone = t('registerPage.phoneRequired')
    valid = false
  } else if (!PHONE_PATTERN.test(trimmedPhone)) {
    fieldErrors.phone = t('registerPage.validPhoneNumberErrorMessage')
    valid = false
  }

  const trimmedEmail = email.value.trim()
  if (!trimmedEmail) {
    fieldErrors.email = t('loginPage.emailRequired')
    valid = false
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    fieldErrors.email = t('loginPage.invalidEmail')
    valid = false
  }

  if (!password.value) {
    fieldErrors.password = t('loginPage.passwordRequired')
    valid = false
  } else if (password.value.length < 8) {
    fieldErrors.password = t('loginPage.passwordMinLengthErrorMessage')
    valid = false
  }

  if (!agreedToTerms.value) {
    fieldErrors.terms = t('registerPage.termsRequired')
    valid = false
  }

  return valid
}

async function onSubmit() {
  if (!validate()) return

  try {
    await register({
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      password: password.value,
      isTermAndConditionAgreed: agreedToTerms.value
    })
    await navigateTo({
      path: '/login',
      query: { registered: '1' },
      replace: true
    })
  } catch (err) {
    notify.showError({
      title: t('notifications.registerErrorTitle'),
      description: failureMessage(err)
    })
  }
}
</script>
