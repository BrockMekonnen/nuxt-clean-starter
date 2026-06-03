<template>
  <div
    class="box-border flex h-14 shrink-0 items-center border-b border-border/10"
    :class="[collapsed ? 'w-20 max-w-20' : 'gap-3 pe-3']"
    :style="{ paddingInlineStart: `${NAV_HEADER_MENU_INSET_PX}px` }"
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
      class="flex min-w-0 items-center gap-2"
    >
      <AppLogo size="2rem" />
      <AppName custom-class="text-sm" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { AppIcons } from '../../icons/app_icons'
import { NAV_HEADER_MENU_INSET_PX } from '../constants/nav_dimensions'
import AppIcon from '@shared/components/app_icon.vue'
import AppLogo from '@shared/components/app_logo.vue'
import AppName from '@shared/components/app_name.vue'

const props = defineProps<{
  collapsed: boolean
  menuMode: 'toggle' | 'open-drawer' | 'close-drawer'
}>()

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
</script>
