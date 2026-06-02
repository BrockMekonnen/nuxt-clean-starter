import type { AdaptiveDestination } from './types/adaptive_destination'

/** Keyed by [AdaptiveDestination.id] so repeated bootstrap (SSR + client) cannot duplicate items. */
const registry = new Map<string, AdaptiveDestination>()

export function registerNavDestinations(...items: AdaptiveDestination[]) {
  for (const item of items) {
    registry.set(item.id, item)
  }
}

export function getNavDestinations(): AdaptiveDestination[] {
  return [...registry.values()].sort((a, b) => a.order - b.order)
}

export function firstNavRoute(): string {
  return getNavDestinations()[0]?.route ?? '/home'
}

export function findDestinationByRoute(
  path: string
): AdaptiveDestination | undefined {
  return getNavDestinations().find((d) => d.route === path)
}

export function findDestinationById(
  id: string
): AdaptiveDestination | undefined {
  return registry.get(id)
}
