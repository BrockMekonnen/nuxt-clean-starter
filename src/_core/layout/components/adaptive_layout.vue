<template>
  <div class="min-h-screen bg-bg text-text">
    <!-- Mobile: bottom navigation -->
    <div
      v-if="!hideNavOnMobile"
      class="flex min-h-screen flex-col md:hidden"
    >
      <AdaptiveAppHeader :title="pageTitle" />
      <main class="flex-1 overflow-auto">
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
      class="flex min-h-screen flex-col md:hidden"
    >
      <AdaptiveAppHeader :title="pageTitle" />
      <main class="flex-1 overflow-auto">
        <div class="mx-auto w-full max-w-5xl px-4 py-6">
          <slot />
        </div>
      </main>
    </div>

    <!-- Tablet: icon rail + optional overlay drawer -->
    <div class="hidden min-h-screen md:flex lg:hidden">
      <AdaptiveSideNav
        :destinations="destinationsWithLabels"
        :selected-id="selectedId"
        collapsed
        menu-mode="open-drawer"
        @navigate="onNavigate"
      />
      <div class="flex min-w-0 flex-1 flex-col">
        <AdaptiveAppHeader :title="pageTitle" />
        <main class="flex-1 overflow-auto">
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

    <!-- Desktop: permanent expandable side nav -->
    <div class="hidden min-h-screen lg:flex">
      <AdaptiveSideNav
        :destinations="destinationsWithLabels"
        :selected-id="selectedId"
        :collapsed="!navStore.isDrawerExpanded"
        menu-mode="toggle"
        @navigate="onNavigate"
      />
      <div class="flex min-w-0 flex-1 flex-col">
        <AdaptiveAppHeader :title="pageTitle" />
        <main class="flex-1 overflow-auto">
          <div class="mx-auto w-full max-w-5xl px-4 py-6">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdaptiveAppHeader from './adaptive_app_header.vue'
import AdaptiveBottomNav from './adaptive_bottom_nav.vue'
import AdaptiveMobileDrawer from './adaptive_mobile_drawer.vue'
import AdaptiveSideNav from './adaptive_side_nav.vue'
import { useNavDestinations } from '../composables/use_nav_destinations'

const route = useRoute()
const { t } = useI18n()
const navStore = useNavigationStore()

const { destinationsWithLabels, selectedId } = useNavDestinations()

const hideNavOnMobile = computed(
  () => route.meta.hideNavOnMobile === true
)

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
