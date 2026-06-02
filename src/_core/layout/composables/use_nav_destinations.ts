import {
  findDestinationById,
  findDestinationByRoute,
  getNavDestinations
} from '../navigation_registry'
import type { AdaptiveDestination } from '../types/adaptive_destination'

export function useNavDestinations() {
  const { t } = useI18n()
  const route = useRoute()

  const destinations = computed(() => getNavDestinations())

  const destinationsWithLabels = computed(() =>
    destinations.value.map((d) => ({
      ...d,
      title: t(d.titleKey)
    }))
  )

  const selectedId = computed(() => {
    const metaTab = route.meta.navTab
    if (typeof metaTab === 'string') return metaTab
    return findDestinationByRoute(route.path)?.id ?? ''
  })

  function labelFor(destination: AdaptiveDestination) {
    return t(destination.titleKey)
  }

  return {
    destinations,
    destinationsWithLabels,
    selectedId,
    labelFor,
    findDestinationById,
    findDestinationByRoute
  }
}
