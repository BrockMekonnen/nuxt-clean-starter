<template>
  <Icon
    :name="NUXT_LOGO_ICON"
    :size="size"
    class="inline-block shrink-0 text-[#00DC82]"
    :class="customClass"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { NUXT_LOGO_ICON } from '@shared/constants/brand'

withDefaults(
  defineProps<{
    size?: string | number
    customClass?: string
  }>(),
  {
    size: '2rem',
    customClass: ''
  }
)
</script>
