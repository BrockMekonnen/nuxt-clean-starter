<template>
  <nav
    class="sticky bottom-0 z-10 border-t border-border/10 bg-surface/95 backdrop-blur"
    aria-label="Main"
  >
    <div class="mx-auto flex max-w-lg justify-around px-2 py-1">
      <NuxtLink
        v-for="item in visibleDestinations"
        :key="item.id"
        :to="item.route"
        class="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-2 text-xs transition"
        :class="
          item.id === selectedId
            ? 'text-primary font-semibold'
            : 'text-muted hover:text-text'
        "
        :aria-current="item.id === selectedId ? 'page' : undefined"
      >
        <span class="text-lg" aria-hidden="true">{{ item.icon }}</span>
        <span class="truncate">{{ item.title }}</span>
      </NuxtLink>
      <button
        v-if="overflowDestinations.length > 0"
        type="button"
        class="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-2 text-xs text-muted hover:text-text"
        :aria-label="t('layoutPage.more')"
        @click="navStore.openMobileDrawer()"
      >
        <span class="text-lg" aria-hidden="true">⋯</span>
        <span>{{ t('layoutPage.more') }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
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
</script>
