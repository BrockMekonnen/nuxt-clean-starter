<template>
  <aside
    class="flex shrink-0 flex-col border-e border-border/10 bg-surface/40"
    :class="collapsed ? 'w-20' : 'w-[280px]'"
  >
    <div
      class="flex h-14 shrink-0 items-center gap-2 border-b border-border/10 px-3"
    >
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text hover:bg-bg/60"
        :aria-label="collapsed ? 'Open menu' : 'Toggle menu'"
        @click="onMenuClick"
      >
        <span class="text-xl" aria-hidden="true">{{ collapsed ? '☰' : '⇔' }}</span>
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

    <nav class="flex-1 overflow-y-auto py-2" aria-label="Main">
      <AdaptiveNavItem
        v-for="item in destinations"
        :key="item.id"
        :destination="item"
        :selected="item.id === selectedId"
        :show-label="!collapsed"
        :item-class="navItemClass(item.id === selectedId, collapsed)"
        @select="onSelect"
      />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import AdaptiveNavItem from './adaptive_nav_item.vue'

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

function navItemClass(selected: boolean, collapsed: boolean) {
  const base =
    'mx-2 mb-1 flex items-center gap-3 rounded-full px-3 py-2.5 text-sm text-text hover:bg-bg/60'
  if (collapsed) {
    return [
      base,
      'justify-center px-0',
      selected ? 'bg-primary/15 text-primary font-semibold' : ''
    ]
  }
  return [base, selected ? 'bg-primary/15 text-primary font-semibold' : '']
}

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
}
</script>
