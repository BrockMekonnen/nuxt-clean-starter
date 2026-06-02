<template>
  <nav
    class="sticky bottom-0 z-10 border-t border-border/10 bg-surface/95 backdrop-blur"
    aria-label="Main"
  >
    <div class="mx-auto flex max-w-lg justify-around px-1 py-0.5">
      <div
        v-for="item in visibleDestinations"
        :key="item.id"
        class="min-w-0 flex-1"
      >
        <NavDestinationItem
          :destination="item"
          :selected="item.id === selectedId"
          variant="bottom"
          @select="goTo"
        />
      </div>
      <button
        v-if="overflowDestinations.length > 0"
        type="button"
        class="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 border-0 bg-transparent py-0 text-muted hover:text-text"
        style="height: 56px"
        :aria-label="t('layoutPage.more')"
        @click="navStore.openMobileDrawer()"
      >
        <span
          class="flex h-8 w-14 items-center justify-center rounded-2xl transition-colors hover:bg-bg/45"
        >
          <AppIcon :name="AppIcons.more" size="1.25rem" />
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { NavDestinationView } from './nav_destination_item.vue'
import { AppIcons } from '../../icons/app_icons'
import AppIcon from '@shared/components/app_icon.vue'
import NavDestinationItem from './nav_destination_item.vue'

const BOTTOM_NAV_MAX = 5

const props = defineProps<{
  destinations: Array<{
    id: string
    title: string
    icon: string
    route: string
  }>
  selectedId: string
}>()

const { t } = useI18n()
const navStore = useNavigationStore()

const visibleDestinations = computed(() =>
  props.destinations.slice(0, BOTTOM_NAV_MAX)
)
const overflowDestinations = computed(() =>
  props.destinations.slice(BOTTOM_NAV_MAX)
)

function goTo(destination: NavDestinationView) {
  return navigateTo(destination.route)
}
</script>
