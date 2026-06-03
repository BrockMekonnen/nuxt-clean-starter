<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-text"
  >
    <p class="text-6xl font-bold text-primary">{{ error.statusCode }}</p>
    <h1 class="text-2xl font-semibold">{{ title }}</h1>
    <p class="max-w-md text-muted">{{ message }}</p>

    <div class="mt-4 flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
        @click="handleClear"
      >
        {{ t('errorPage.goHome') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()

const title = computed(() =>
  props.error.statusCode === 404
    ? t('errorPage.notFoundTitle')
    : t('errorPage.title')
)

const message = computed(() => props.error.message || t('errorPage.message'))

function handleClear() {
  clearError({ redirect: '/' })
}
</script>
