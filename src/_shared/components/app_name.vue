<template>
  <component
    :is="tag"
    class="truncate font-bold tracking-tight"
    :class="customClass"
  >
    {{ t('app.title') }}
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Root element, e.g. `span` in a link or `h1` on a page. */
    tag?: string
    /** Extra classes (e.g. `text-sm`, `hidden sm:inline`). */
    customClass?: string
  }>(),
  {
    tag: 'span',
    customClass: ''
  }
)

const { t } = useI18n()
</script>
