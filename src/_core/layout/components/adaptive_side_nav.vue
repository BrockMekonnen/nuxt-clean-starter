<template>
  <aside
    class="flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-e border-border/10 bg-surface/40 transition-[width] duration-200 ease-in-out"
    :style="{ width: collapsed ? `${NAV_RAIL_WIDTH_PX}px` : `${NAV_DRAWER_WIDTH_PX}px` }"
  >
    <SideNavHeader
      v-if="showHeader"
      :collapsed="collapsed"
      :menu-mode="menuMode"
    />

    <nav
      class="min-h-0 flex-1 overflow-y-auto overscroll-contain pt-2.5"
      aria-label="Main"
    >
      <NavDestinationItem
        v-for="item in destinations"
        :key="item.id"
        :destination="item"
        :selected="item.id === selectedId"
        :variant="collapsed ? 'rail' : 'drawer'"
        @select="onSelect"
      />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import {
  NAV_DRAWER_WIDTH_PX,
  NAV_RAIL_WIDTH_PX
} from '../constants/nav_dimensions'
import NavDestinationItem from './nav_destination_item.vue'
import SideNavHeader from './side_nav_header.vue'

withDefaults(
  defineProps<{
    destinations: Array<{
      id: string
      title: string
      icon: string
      route: string
    }>
    selectedId: string
    collapsed: boolean
    menuMode: 'toggle' | 'open-drawer' | 'close-drawer'
    /** When false, only nav destinations render (header lives in layout grid row). */
    showHeader?: boolean
  }>(),
  { showHeader: true }
)

const emit = defineEmits<{
  navigate: [route: string]
}>()

function onSelect(destination: { route: string }) {
  emit('navigate', destination.route)
  return navigateTo(destination.route)
}
</script>
