<template>
  <div class="fixed inset-0 z-50 lg:hidden">
    <button
      type="button"
      class="absolute inset-0 bg-black/40"
      aria-label="Close menu"
      @click="$emit('close')"
    />
    <aside
      class="absolute inset-y-0 start-0 flex flex-col bg-surface shadow-xl"
      :style="{ width: `${NAV_DRAWER_WIDTH_PX}px`, maxWidth: '85vw' }"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div
        class="flex h-14 shrink-0 items-center justify-between border-b border-border/10 px-4"
      >
        <span class="font-semibold">{{ t('app.title') }}</span>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-bg/60 hover:text-text"
          @click="$emit('close')"
        >
          <AppIcon :name="AppIcons.menuOpen" size="1.25rem" />
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto pt-2.5" aria-label="Main">
        <NavDestinationItem
          v-for="item in destinations"
          :key="item.id"
          :destination="item"
          :selected="item.id === selectedId"
          variant="drawer"
          @select="onNavigate"
        />
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { NavDestinationView } from './nav_destination_item.vue'
import { AppIcons } from '../../icons/app_icons'
import { NAV_DRAWER_WIDTH_PX } from '../constants/nav_dimensions'
import AppIcon from '../../../_shared/components/app_icon.vue'
import NavDestinationItem from './nav_destination_item.vue'

defineProps<{
  destinations: Array<{
    id: string
    title: string
    icon: string
    route: string
  }>
  selectedId: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

function onNavigate(destination: NavDestinationView) {
  emit('close')
  return navigateTo(destination.route)
}
</script>
