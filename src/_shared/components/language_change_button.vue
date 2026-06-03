<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/15 bg-surface text-text transition hover:border-border/30"
      :title="t('layoutPage.changeLanguage')"
      :aria-label="t('layoutPage.changeLanguage')"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <AppIcon :name="AppIcons.language" size="1.25rem" />
    </button>

    <div
      v-if="isOpen"
      class="absolute end-0 top-11 z-20 min-w-[180px] overflow-hidden rounded-xl border border-border/15 bg-surface py-1 shadow-lg"
      role="menu"
    >
      <button
        v-for="item in languages"
        :key="item.code"
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-2 px-3 py-2 text-start text-sm hover:bg-bg/60"
        :class="{ 'bg-primary/10 text-primary': locale === item.code }"
        @click="selectLanguage(item.code)"
      >
        <span aria-hidden="true">{{ item.flag }}</span>
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppIcons } from '@core/icons/app_icons'
import AppIcon from './app_icon.vue'

const { t, locale, setLocale } = useI18n()

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
] as const

const onClickOutside = (event: MouseEvent) => {
  if (!root.value?.contains(event.target as Node)) {
    isOpen.value = false
  }
}

async function selectLanguage(code: (typeof languages)[number]['code']) {
  await setLocale(code)
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>
