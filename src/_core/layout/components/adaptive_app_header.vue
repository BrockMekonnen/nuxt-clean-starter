<template>
  <header
    class="sticky top-0 z-10 shrink-0 border-b border-border/10 bg-bg/80 backdrop-blur"
  >
    <div class="flex h-14 items-center justify-between gap-4 px-4">
      <h1 class="truncate text-lg font-semibold">
        {{ title }}
      </h1>
      <AppBarActions />
    </div>
  </header>
</template>

<script setup lang="ts">
import AppBarActions from './app_bar_actions.vue'

defineProps<{
  title: string
}>()
</script>
