<template>
  <div class="h-dvh overflow-hidden bg-bg text-text">
    <!-- Mobile: bottom navigation -->
    <div
      v-if="!hideNavOnMobile"
      class="flex h-full flex-col overflow-hidden md:hidden"
    >
      <AdaptiveAppHeader :title="pageTitle" />
      <main class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div class="mx-auto w-full max-w-5xl px-4 py-6">
          <slot />
        </div>
      </main>
      <AdaptiveBottomNav
        :destinations="destinationsWithLabels"
        :selected-id="selectedId"
      />
      <AdaptiveMobileDrawer
        v-if="navStore.isMobileDrawerOpen"
        :destinations="destinationsWithLabels"
        :selected-id="selectedId"
        @close="navStore.closeMobileDrawer()"
      />
    </div>

    <!-- Mobile: simple shell (no bottom nav) -->
    <div
      v-else
      class="flex h-full flex-col overflow-hidden md:hidden"
    >
      <AdaptiveAppHeader :title="pageTitle" />
      <main class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div class="mx-auto w-full max-w-5xl px-4 py-6">
          <slot />
        </div>
      </main>
    </div>

    <!-- Tablet: icon rail + optional overlay drawer -->
    <div class="hidden h-full overflow-hidden md:flex lg:hidden">
      <AdaptiveSideNav
        class="h-full min-h-0 shrink-0"
        :destinations="destinationsWithLabels"
        :selected-id="selectedId"
        collapsed
        menu-mode="open-drawer"
        @navigate="onNavigate"
      />
      <div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <AdaptiveAppHeader :title="pageTitle" />
        <main class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div class="mx-auto w-full max-w-5xl px-4 py-6">
            <slot />
          </div>
        </main>
      </div>
      <AdaptiveMobileDrawer
        v-if="navStore.isMobileDrawerOpen"
        :destinations="destinationsWithLabels"
        :selected-id="selectedId"
        @close="navStore.closeMobileDrawer()"
      />
    </div>

    <!-- Desktop: shared header row so dividers align with main app bar -->
    <div
      class="hidden h-full overflow-hidden lg:grid"
      :style="desktopGridStyle"
    >
      <SideNavHeader
        class="border-e border-border/10 bg-surface/40"
        :collapsed="!navStore.isDrawerExpanded"
        menu-mode="toggle"
      />
      <AdaptiveAppHeader :title="pageTitle" />
      <AdaptiveSideNav
        class="min-h-0 overflow-hidden"
        :destinations="destinationsWithLabels"
        :selected-id="selectedId"
        :collapsed="!navStore.isDrawerExpanded"
        menu-mode="toggle"
        :show-header="false"
        @navigate="onNavigate"
      />
      <main class="min-h-0 overflow-y-auto overscroll-contain">
        <div class="mx-auto w-full max-w-5xl px-4 py-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdaptiveAppHeader from './adaptive_app_header.vue'
import AdaptiveBottomNav from './adaptive_bottom_nav.vue'
import AdaptiveMobileDrawer from './adaptive_mobile_drawer.vue'
import AdaptiveSideNav from './adaptive_side_nav.vue'
import SideNavHeader from './side_nav_header.vue'
import {
  NAV_DRAWER_WIDTH_PX,
  NAV_RAIL_WIDTH_PX
} from '../constants/nav_dimensions'
import { useNavDestinations } from '../composables/use_nav_destinations'

const route = useRoute()
const { t } = useI18n()
const navStore = useNavigationStore()

const { destinationsWithLabels, selectedId } = useNavDestinations()

const hideNavOnMobile = computed(
  () => route.meta.hideNavOnMobile === true
)

const desktopGridStyle = computed(() => {
  const navWidth = navStore.isDrawerExpanded
    ? NAV_DRAWER_WIDTH_PX
    : NAV_RAIL_WIDTH_PX
  return {
    gridTemplateColumns: `${navWidth}px 1fr`,
    gridTemplateRows: 'auto 1fr'
  }
})

const pageTitle = computed(() => {
  const key = route.meta.appTitle
  if (typeof key === 'string') return t(key)
  return t('app.title')
})

function onNavigate(path: string) {
  navStore.closeMobileDrawer()
  return navigateTo(path)
}
</script>
