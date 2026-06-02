<template>
  <div class="h-dvh overflow-hidden">
    <AdaptiveLayout>
      <slot />
    </AdaptiveLayout>
  </div>
</template>

<script setup lang="ts">
import AdaptiveLayout from '../_core/layout/components/adaptive_layout.vue'
</script>
