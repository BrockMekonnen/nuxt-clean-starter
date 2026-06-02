<template>
  <aside
    class="flex shrink-0 flex-col border-e border-border/10 bg-surface/40 transition-[width] duration-200 ease-in-out"
    :style="{ width: collapsed ? `${NAV_RAIL_WIDTH_PX}px` : `${NAV_DRAWER_WIDTH_PX}px` }"
  >
    <div
      class="flex shrink-0 items-center border-b border-border/10"
      :class="
        collapsed
          ? 'h-14 w-20 justify-center'
          : 'h-14 gap-2 px-3'
      "
    >
      <button
        type="button"
        class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-text hover:bg-bg/60"
        :aria-label="collapsed ? 'Open menu' : 'Toggle menu'"
        @click="onMenuClick"
      >
        <AppIcon
          :name="collapsed ? AppIcons.menu : AppIcons.menuOpen"
          size="1.5rem"
        />
      </button>
      <NuxtLink
        v-if="!collapsed"
        to="/home"
        class="flex min-w-0 items-center gap-2 font-bold tracking-tight"
      >
        <span
          class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-sm text-primary"
        >
          N
        </span>
        <span class="truncate text-sm">{{ t('app.title') }}</span>
      </NuxtLink>
    </div>

    <nav class="flex-1 overflow-y-auto pt-2.5" aria-label="Main">
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
import { AppIcons } from '../../icons/app_icons'
import {
  NAV_DRAWER_WIDTH_PX,
  NAV_RAIL_WIDTH_PX
} from '../constants/nav_dimensions'
import AppIcon from '../../../_shared/components/app_icon.vue'
import NavDestinationItem from './nav_destination_item.vue'

const props = defineProps<{
  destinations: Array<{
    id: string
    title: string
    icon: string
    route: string
  }>
  selectedId: string
  collapsed: boolean
  menuMode: 'toggle' | 'open-drawer' | 'close-drawer'
}>()

const emit = defineEmits<{
  navigate: [route: string]
}>()

const { t } = useI18n()
const navStore = useNavigationStore()

function onMenuClick() {
  if (props.menuMode === 'toggle') {
    navStore.toggleDrawer()
  } else if (props.menuMode === 'open-drawer') {
    navStore.openMobileDrawer()
  } else {
    navStore.closeMobileDrawer()
  }
}

function onSelect(destination: { route: string }) {
  emit('navigate', destination.route)
  return navigateTo(destination.route)
}
</script>
