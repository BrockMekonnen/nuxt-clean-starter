export {}

declare module '#app' {
  interface PageMeta {
    /** Nav tab id — matches [AdaptiveDestination.id] */
    navTab?: string
    /** i18n key for the app bar title */
    appTitle?: string
    requiresAuth?: boolean
    guestOnly?: boolean
    /** Mobile-only: hide bottom nav (simple app bar + body) */
    hideNavOnMobile?: boolean
  }
}
