export {}

declare module '#app' {
  interface PageMeta {
    /** Nav tab id — matches [AdaptiveDestination.id] */
    navTab?: string
    /** i18n key for the app bar title */
    appTitle?: string
    /** Show a leading back control in the app bar (drill-down routes). */
    showAppBarBack?: boolean
    /** Fallback route when browser history has no prior entry (e.g. direct link). */
    backTo?: string
    /** Optional i18n key for the back button aria-label (defaults to `layoutPage.back`). */
    appBarBackLabel?: string
    requiresAuth?: boolean
    guestOnly?: boolean
    /** Mobile-only: hide bottom nav (simple app bar + body) */
    hideNavOnMobile?: boolean
  }
}
