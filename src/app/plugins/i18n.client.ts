export default defineNuxtPlugin(() => {
  const { locale } = useI18n()

  const updateDir = () => {
    document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  }

  onMounted(() => {
    updateDir()
    watch(locale, updateDir)
  })
})

