<template>
  <Icon
    :name="name"
    :size="size"
    class="inline-block shrink-0"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Iconify name, e.g. `mdi:home` or use [AppIcons] */
    name: string
    size?: string | number
  }>(),
  {
    size: '1.25rem'
  }
)
</script>
