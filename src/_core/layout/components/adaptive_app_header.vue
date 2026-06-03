<template>
  <header class="sticky top-0 z-10 shrink-0 bg-bg/80 backdrop-blur">
    <div
      class="box-border flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border/10 px-4"
    >
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <button
          v-if="showBack"
          type="button"
          class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-text transition hover:bg-bg/60"
          :aria-label="backLabel"
          @click="goBack"
        >
          <AppIcon :name="AppIcons.arrowBack" size="1.5rem" />
        </button>
        <h1 class="truncate text-lg font-semibold">
          {{ title }}
        </h1>
      </div>
      <AppBarActions />
    </div>
  </header>
</template>

<script setup lang="ts">
import { AppIcons } from '@core/icons/app_icons'
import { useAppBarBack } from '../composables/use_app_bar_back'
import AppBarActions from './app_bar_actions.vue'
import AppIcon from '@shared/components/app_icon.vue'

defineProps<{
  title: string
}>()

const { showBack, backLabel, goBack } = useAppBarBack()
</script>
