<template>
  <p
    v-if="show"
    class="bg-amber-500/90 px-4 py-2 text-center text-sm font-medium text-amber-950"
    role="status"
  >
    {{ t('layoutPage.offline') }}
  </p>
</template>

<script setup lang="ts">
const { t } = useI18n()
const network = useNetworkStore()

const show = computed(() => import.meta.client && !network.isOnline)
</script>
