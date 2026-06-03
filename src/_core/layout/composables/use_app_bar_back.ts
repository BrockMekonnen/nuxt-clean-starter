/**
 * App bar back control (Flutter AppBar leading / Navigator.pop).
 * Opt in per route via `definePageMeta({ showAppBarBack: true, backTo: '/parent' })`.
 */
export function useAppBarBack() {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const showBack = computed(() => route.meta.showAppBarBack === true)

  const backLabel = computed(() => {
    const key = route.meta.appBarBackLabel
    if (typeof key === 'string') return t(key)
    return t('layoutPage.back')
  })

  async function goBack() {
    if (import.meta.client && window.history.length > 1) {
      router.back()
      return
    }
    const backTo = route.meta.backTo
    if (typeof backTo === 'string') {
      await navigateTo(backTo)
    }
  }

  return { showBack, backLabel, goBack }
}
