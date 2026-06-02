<template>
  <component
    :is="asButton ? 'button' : 'NuxtLink'"
    :to="asButton ? undefined : destination.route"
    type="button"
    class="transition"
    :class="itemClass"
    :aria-current="selected ? 'page' : undefined"
    @click="asButton ? $emit('select', destination) : undefined"
  >
    <span class="flex shrink-0 items-center justify-center" aria-hidden="true">
      {{ destination.icon }}
    </span>
    <span v-if="showLabel" class="truncate">{{ destination.title }}</span>
  </component>
</template>

<script setup lang="ts">
type DestinationView = {
  id: string
  title: string
  icon: string
  route: string
}

defineProps<{
  destination: DestinationView
  selected: boolean
  showLabel: boolean
  itemClass: string | string[] | Record<string, boolean>
  asButton?: boolean
}>()

defineEmits<{
  select: [destination: DestinationView]
}>()
</script>
