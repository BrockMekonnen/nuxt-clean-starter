<template>
  <div class="fixed inset-0 z-50 lg:hidden">
    <button
      type="button"
      class="absolute inset-0 bg-black/40"
      aria-label="Close menu"
      @click="$emit('close')"
    />
    <aside
      class="absolute inset-y-0 start-0 flex w-[min(280px,85vw)] flex-col bg-surface shadow-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div
        class="flex h-14 items-center justify-between border-b border-border/10 px-4"
      >
        <span class="font-semibold">{{ t('app.title') }}</span>
        <button
          type="button"
          class="rounded-lg px-2 py-1 text-muted hover:text-text"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto py-2">
        <NuxtLink
          v-for="item in destinations"
          :key="item.id"
          :to="item.route"
          class="mx-2 mb-1 flex items-center gap-3 rounded-full px-3 py-2.5 text-sm hover:bg-bg/60"
          :class="
            item.id === selectedId
              ? 'bg-primary/15 font-semibold text-primary'
              : 'text-text'
          "
          @click="$emit('close')"
        >
          <span aria-hidden="true">{{ item.icon }}</span>
          <span>{{ item.title }}</span>
        </NuxtLink>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  destinations: Array<{
    id: string
    title: string
    icon: string
    route: string
  }>
  selectedId: string
}>()

defineEmits<{
  close: []
}>()

const { t } = useI18n()
</script>
