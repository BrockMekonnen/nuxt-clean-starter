/** Logical nav target id (e.g. `home`, `profile`). */
export type NavTabId = string

/**
 * Navigation destination — register from modules via `registerNavDestinations`.
 * Mirrors Flutter's [AdaptiveDestination].
 */
export type AdaptiveDestination = {
  id: NavTabId
  /** i18n key for the label */
  titleKey: string
  /** Iconify icon name, e.g. `mdi:home` — see [AppIcons] */
  icon: string
  route: string
  order: number
}
