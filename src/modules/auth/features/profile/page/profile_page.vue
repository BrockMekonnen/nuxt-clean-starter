<template>
  <div class="mx-auto w-full max-w-2xl">
    <div
      class="rounded-2xl border border-border/10 bg-surface/30 p-8 shadow-sm md:bg-surface/50"
    >
      <p class="text-center text-sm text-muted">{{ t('profilePage.title') }}</p>
      <div
        class="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-4xl text-primary"
        aria-hidden="true"
      >
        👤
      </div>
      <p class="mt-6 text-center text-2xl font-bold">
        {{ email }}
      </p>
      <p v-if="userId" class="mt-2 text-center text-sm text-muted">
        ID: {{ userId }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const auth = useAuthStore()

const email = computed(() => auth.session?.user.email ?? '—')
const userId = computed(() => auth.session?.user.id)
</script>
