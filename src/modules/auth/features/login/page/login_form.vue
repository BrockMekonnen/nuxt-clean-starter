<template>
  <div
    class="w-full max-w-[500px] rounded-xl border border-border/15 bg-surface/30 px-10 py-12 shadow-sm md:bg-surface/50"
  >
    <form class="flex flex-col items-center" @submit.prevent="onSubmit">
      <div
        class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl font-bold text-primary"
        aria-hidden="true"
      >
        N
      </div>

      <h1 class="mt-3 text-center text-2xl font-medium">
        {{ t('loginPage.signIn') }}
      </h1>

      <p
        v-if="registeredBanner"
        class="mt-4 w-full rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-center text-sm text-primary"
        role="status"
      >
        {{ registeredBanner }}
      </p>

      <div class="mt-10 w-full space-y-4">
        <label class="block w-full">
          <span class="mb-1.5 block text-sm font-medium text-muted">
            {{ t('loginPage.emailAddress') }}
          </span>
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2.5 text-text outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            :class="{ 'border-red-400/60': fieldErrors.email }"
          />
          <p v-if="fieldErrors.email" class="mt-1 text-xs text-red-400">
            {{ fieldErrors.email }}
          </p>
        </label>

        <label class="block w-full">
          <span class="mb-1.5 block text-sm font-medium text-muted">
            {{ t('loginPage.password') }}
          </span>
          <div class="relative">
            <input
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              autocomplete="current-password"
              class="w-full rounded border border-border/20 bg-bg/50 px-3 py-2.5 pr-10 text-text outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              :class="{ 'border-red-400/60': fieldErrors.password }"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-2 flex items-center px-2 text-muted hover:text-text"
              :aria-label="
                isPasswordVisible
                  ? t('loginPage.hidePassword')
                  : t('loginPage.showPassword')
              "
              @click="isPasswordVisible = !isPasswordVisible"
            >
              <AppIcon
                :name="
                  isPasswordVisible
                    ? AppIcons.visibilityOff
                    : AppIcons.visibility
                "
                size="1.15rem"
              />
            </button>
          </div>
          <p v-if="fieldErrors.password" class="mt-1 text-xs text-red-400">
            {{ fieldErrors.password }}
          </p>
        </label>
      </div>

      <button
        type="submit"
        class="mt-10 flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="isLoading"
      >
        <span
          v-if="isLoading"
          class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
        />
        <span v-else>{{ t('loginPage.signIn') }}</span>
      </button>

      <p
        v-if="errorMessage"
        class="mt-4 w-full rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300"
      >
        {{ errorMessage }}
      </p>

      <div
        class="mt-10 flex flex-wrap items-center justify-center gap-1 text-sm text-muted"
      >
        <span>{{ t('loginPage.dontHaveAccount') }}</span>
        <NuxtLink
          to="/register"
          class="font-semibold text-primary hover:underline"
        >
          {{ t('loginPage.signUp') }}
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { AppIcons } from '@core/icons/app_icons'
import { firstNavRoute } from '@core/layout/navigation_registry'
import { safeRedirectPath } from '@core/routing/safe_redirect'
import AppIcon from '@shared/components/app_icon.vue'

const { t } = useI18n()
const route = useRoute()
const { isLoading, errorMessage, login } = useAuth()

const email = ref(import.meta.dev ? 'jane.doe@test.com' : '')
const password = ref(import.meta.dev ? 'test@test12' : '')

const registeredBanner = computed(() =>
  route.query.registered === '1' ? t('registerPage.success') : ''
)
const isPasswordVisible = ref(false)

const fieldErrors = reactive({
  email: '',
  password: ''
})

function validate(): boolean {
  fieldErrors.email = ''
  fieldErrors.password = ''

  const trimmedEmail = email.value.trim()
  if (!trimmedEmail) {
    fieldErrors.email = t('loginPage.emailRequired')
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    fieldErrors.email = t('loginPage.invalidEmail')
    return false
  }

  if (!password.value) {
    fieldErrors.password = t('loginPage.passwordRequired')
    return false
  }
  if (password.value.length < 8) {
    fieldErrors.password = t('loginPage.passwordMinLengthErrorMessage')
    return false
  }

  return true
}

async function onSubmit() {
  if (!validate()) return

  try {
    await login(email.value.trim(), password.value)
    const redirect = safeRedirectPath(
      typeof route.query.redirect === 'string' ? route.query.redirect : null,
      firstNavRoute()
    )
    await navigateTo(redirect, { replace: true })
  } catch {
    // errorMessage set in store
  }
}
</script>
