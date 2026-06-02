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
          <span class="mb-1 block text-sm text-muted">{{ t('registerPage.firstName') }}</span>
          <input
            v-model="firstName"
            type="text"
            autocomplete="given-name"
            class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text"
          />
        </label>
        <label class="block">
          <span class="mb-1 block text-sm text-muted">{{ t('registerPage.lastName') }}</span>
          <input
            v-model="lastName"
            type="text"
            autocomplete="family-name"
            class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text"
          />
        </label>
      </div>

      <label class="block">
        <span class="mb-1 block text-sm text-muted">{{ t('registerPage.phone') }}</span>
        <input
          v-model="phone"
          type="tel"
          autocomplete="tel"
          class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm text-muted">{{ t('loginPage.emailAddress') }}</span>
        <input
          v-model="email"
          type="email"
          autocomplete="email"
          class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm text-muted">{{ t('loginPage.password') }}</span>
        <input
          v-model="password"
          type="password"
          autocomplete="new-password"
          class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2 text-text"
        />
      </label>

      <label class="flex items-start gap-2 text-sm">
        <input v-model="agreedToTerms" type="checkbox" class="mt-1" />
        <span>{{ t('registerPage.agreeTerms') }}</span>
      </label>

      <button
        type="submit"
        class="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white disabled:opacity-70"
        :disabled="isLoading"
      >
        {{ isLoading ? t('registerPage.signingUp') : t('registerPage.signUp') }}
      </button>

      <p v-if="errorMessage" class="text-sm text-red-400">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-sm text-primary">{{ successMessage }}</p>

      <p class="text-center text-sm text-muted">
        {{ t('registerPage.hasAccount') }}
        <NuxtLink to="/login" class="font-semibold text-primary hover:underline">
          {{ t('loginPage.signIn') }}
        </NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { isLoading, errorMessage, register } = useAuth()

const firstName = ref('Jane')
const lastName = ref('Doe')
const phone = ref('+1 123 456 7890')
const email = ref('')
const password = ref('')
const agreedToTerms = ref(false)
const successMessage = ref('')

async function onSubmit() {
  successMessage.value = ''
  try {
    await register({
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      password: password.value,
      isTermAndConditionAgreed: agreedToTerms.value
    })
    successMessage.value = t('registerPage.success')
    await navigateTo('/login', { replace: true })
  } catch {
    // store sets errorMessage
  }
}
</script>
