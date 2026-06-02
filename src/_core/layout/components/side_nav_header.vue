<template>
  <div
    class="box-border flex h-14 shrink-0 items-center border-b border-border/10"
    :class="collapsed ? 'justify-center' : 'gap-3 pe-3'"
    :style="headerStyle"
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
</template>

<script setup lang="ts">
import { AppIcons } from '../../icons/app_icons'
import {
  NAV_HEADER_MENU_INSET_PX,
  NAV_RAIL_WIDTH_PX
} from '../constants/nav_dimensions'
import AppIcon from '@shared/components/app_icon.vue'

const props = defineProps<{
  collapsed: boolean
  menuMode: 'toggle' | 'open-drawer' | 'close-drawer'
}>()

const { t } = useI18n()
const navStore = useNavigationStore()

const headerStyle = computed(() => {
  if (props.collapsed) {
    return {
      width: `${NAV_RAIL_WIDTH_PX}px`,
      maxWidth: `${NAV_RAIL_WIDTH_PX}px`
    }
  }
  return { paddingInlineStart: `${NAV_HEADER_MENU_INSET_PX}px` }
})

function onMenuClick() {
  if (props.menuMode === 'toggle') {
    navStore.toggleDrawer()
  } else if (props.menuMode === 'open-drawer') {
    navStore.openMobileDrawer()
  } else {
    navStore.closeMobileDrawer()
  }
}
</script>
