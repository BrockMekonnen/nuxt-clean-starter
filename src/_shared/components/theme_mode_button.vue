<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/15 bg-surface text-lg text-text transition hover:border-border/30"
    :title="t('layoutPage.changeTheme')"
    :aria-label="t('layoutPage.changeTheme')"
    @click="toggleTheme"
  >
    <span aria-hidden="true">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n()
const nuxtApp = useNuxtApp()

const isDark = ref(true)

onMounted(() => {
  isDark.value = nuxtApp.$theme?.get() === 'dark'
})

function toggleTheme() {
  nuxtApp.$theme?.toggle()
  isDark.value = nuxtApp.$theme?.get() === 'dark'
}
</script>
