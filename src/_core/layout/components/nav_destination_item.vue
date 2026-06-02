<template>
  <NuxtLink
    :to="destination.route"
    class="nav-destination group block text-sm transition-colors"
    :class="[
      variantClass,
      selected ? 'nav-destination--selected' : 'nav-destination--unselected'
    ]"
    :aria-current="selected ? 'page' : undefined"
    @click="emit('select', destination)"
  >
    <span class="nav-destination__icon-shell">
      <AppIcon :name="destination.icon" size="1.25rem" />
    </span>
    <span v-if="showLabel" class="nav-destination__label">
      {{ destination.title }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import AppIcon from '@shared/components/app_icon.vue'

export type NavDestinationView = {
  id: string
  title: string
  icon: string
  route: string
}

export type NavDestinationVariant = 'drawer' | 'rail' | 'bottom'

const props = defineProps<{
  destination: NavDestinationView
  selected: boolean
  /** `drawer` = expanded sidebar; `rail` / `bottom` = icon pill + label below when selected */
  variant: NavDestinationVariant
}>()

const emit = defineEmits<{
  select: [destination: NavDestinationView]
}>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'drawer':
      return 'nav-destination--drawer'
    case 'bottom':
      return 'nav-destination--bottom'
    default:
      return 'nav-destination--rail'
  }
})

const showLabel = computed(
  () =>
    props.variant === 'drawer' ||
    ((props.variant === 'rail' || props.variant === 'bottom') && props.selected)
)
</script>

<style scoped>
/* —— Drawer (expanded, 280px) —— */
.nav-destination--drawer {
  display: flex;
  align-items: center;
  height: 52px;
  margin: 2px 10px 2px 12px;
  max-width: calc(280px - 22px);
  border-radius: 9999px;
  padding-right: 16px;
  padding-left: 16px;
  gap: 12px;
}

.nav-destination--drawer .nav-destination__icon-shell {
  display: flex;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.nav-destination--drawer .nav-destination__label {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: inherit;
}

/* —— Rail & bottom nav (icon pill + optional label) —— */
.nav-destination--rail,
.nav-destination--bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 56px;
  border-radius: 0;
  padding: 0;
  background-color: transparent;
}

.nav-destination--rail {
  width: 80px;
}

.nav-destination--bottom {
  width: 100%;
  min-width: 0;
}

.nav-destination--rail .nav-destination__icon-shell,
.nav-destination--bottom .nav-destination__icon-shell {
  display: flex;
  width: 56px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  transition: background-color 0.15s ease;
}

.nav-destination--rail .nav-destination__label,
.nav-destination--bottom .nav-destination__label {
  max-width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.625rem;
  line-height: 1.2;
  text-align: center;
}

/* —— Drawer: full-row selection —— */
.nav-destination--drawer.nav-destination--selected {
  background-color: rgb(var(--c-primary) / 0.15);
  color: rgb(var(--c-primary));
  font-weight: 600;
}

.nav-destination--drawer.nav-destination--selected:hover {
  background-color: rgb(var(--c-primary) / 0.22);
  color: rgb(var(--c-primary));
}

/* —— Rail / bottom: icon pill + label only (no row background) —— */
.nav-destination--rail.nav-destination--selected,
.nav-destination--bottom.nav-destination--selected {
  background-color: transparent;
  color: rgb(var(--c-text));
  font-weight: inherit;
}

.nav-destination--rail.nav-destination--selected:hover,
.nav-destination--bottom.nav-destination--selected:hover {
  background-color: transparent;
}

.nav-destination--rail.nav-destination--selected .nav-destination__icon-shell,
.nav-destination--bottom.nav-destination--selected
  .nav-destination__icon-shell {
  background-color: rgb(var(--c-primary) / 0.15);
  color: rgb(var(--c-primary));
}

.nav-destination--rail.nav-destination--selected:hover
  .nav-destination__icon-shell,
.nav-destination--bottom.nav-destination--selected:hover
  .nav-destination__icon-shell {
  background-color: rgb(var(--c-primary) / 0.22);
  color: rgb(var(--c-primary));
}

.nav-destination--rail.nav-destination--selected .nav-destination__label,
.nav-destination--bottom.nav-destination--selected .nav-destination__label {
  color: rgb(var(--c-primary));
  font-weight: 600;
}

.nav-destination--unselected {
  color: rgb(var(--c-text));
}

.nav-destination--drawer.nav-destination--unselected:hover {
  background-color: rgb(var(--c-bg) / 0.6);
}

.nav-destination--rail.nav-destination--unselected:hover,
.nav-destination--bottom.nav-destination--unselected:hover {
  background-color: transparent;
}

.nav-destination--rail.nav-destination--unselected:hover
  .nav-destination__icon-shell,
.nav-destination--bottom.nav-destination--unselected:hover
  .nav-destination__icon-shell {
  background-color: rgb(var(--c-bg) / 0.45);
}
</style>
