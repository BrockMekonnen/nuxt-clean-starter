import type { AdaptiveDestination } from './types/adaptive_destination'

const registry: AdaptiveDestination[] = []

export function registerNavDestinations(...items: AdaptiveDestination[]) {
  registry.push(...items)
}

export function getNavDestinations(): AdaptiveDestination[] {
  return [...registry].sort((a, b) => a.order - b.order)
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
  return getNavDestinations().find((d) => d.id === id)
}
