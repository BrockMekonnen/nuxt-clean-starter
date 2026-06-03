<template>
  <div class="mx-auto w-full max-w-2xl">
    <div
      class="rounded-2xl border border-border/10 bg-surface/30 p-8 shadow-sm md:bg-surface/50"
    >
      <div class="flex flex-col items-center">
        <AppLogo size="3rem" />
      </div>

      <dl class="mt-8 space-y-4">
        <div
          v-for="row in detailRows"
          :key="row.label"
          class="rounded-lg border border-border/10 bg-bg/40 px-4 py-3"
        >
          <dt class="text-xs font-medium uppercase tracking-wide text-muted">
            {{ row.label }}
          </dt>
          <dd class="mt-1 text-sm font-medium text-text">
            {{ row.value }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from '@shared/components/app_logo.vue'

const { t } = useI18n()
const auth = useAuthStore()

const detailRows = computed(() => {
  const user = auth.user
  return [
    {
      label: t('homeDetailsPage.firstName'),
      value: user?.firstName ?? '—'
    },
    {
      label: t('homeDetailsPage.lastName'),
      value: user?.lastName ?? '—'
    },
    {
      label: t('homeDetailsPage.email'),
      value: user?.email ?? '—'
    },
    {
      label: t('homeDetailsPage.phone'),
      value: user?.phone ?? '—'
    },
    {
      label: t('homeDetailsPage.userId'),
      value: user?.id ?? '—'
    },
    {
      label: t('homeDetailsPage.emailVerified'),
      value: user?.isEmailVerified
        ? t('homeDetailsPage.yes')
        : t('homeDetailsPage.no')
    },
    {
      label: t('homeDetailsPage.roles'),
      value: user?.roles?.length ? user.roles.join(', ') : '—'
    }
  ]
})
</script>
