<template>
  <div class="mx-auto w-full max-w-2xl">
    <div
      class="rounded-2xl border border-border/10 bg-surface/30 p-8 shadow-sm md:bg-surface/50"
    >
      <p class="text-center text-xl font-semibold">
        {{ t('homePage.hello') }}, {{ firstName }}! 👋
      </p>
      <div
        class="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-primary"
      >
        <AppIcon :name="AppIcons.person" size="3.5rem" />
      </div>
      <p class="mt-6 text-center text-2xl font-bold">
        {{ fullName }}
      </p>
      <p class="mt-2 text-center text-sm text-muted">
        {{ email }}
      </p>
      <p v-if="userId" class="mt-1 text-center text-sm text-muted">
        ID: {{ userId }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppIcons } from '@core/icons/app_icons'
import AppIcon from '@shared/components/app_icon.vue'

const { t } = useI18n()
const auth = useAuthStore()

const firstName = computed(
  () => auth.user?.firstName ?? t('homePage.guest')
)
const fullName = computed(() => {
  const user = auth.user
  if (!user) return '—'
  return `${user.firstName} ${user.lastName}`.trim()
})
const email = computed(() => auth.user?.email ?? '—')
const userId = computed(() => auth.user?.id)
</script>
