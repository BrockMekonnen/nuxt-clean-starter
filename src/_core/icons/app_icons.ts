/**
 * Iconify names (Material Design Icons). Aligns with Flutter `Icons.*` where possible.
 * @see https://icon-sets.iconify.design/mdi/
 */
export const AppIcons = {
  home: 'mdi:home',
  settings: 'mdi:cog',
  profile: 'mdi:account',
  login: 'mdi:login',
  register: 'mdi:account-plus',
  logout: 'mdi:logout',
  themeLight: 'mdi:weather-sunny',
  themeDark: 'mdi:weather-night',
  language: 'mdi:translate',
  menu: 'mdi:menu',
  menuOpen: 'mdi:menu-open',
  more: 'mdi:dots-horizontal',
  visibility: 'mdi:eye',
  visibilityOff: 'mdi:eye-off',
  github: 'mdi:github',
  person: 'mdi:account-circle'
} as const

export type AppIconName = (typeof AppIcons)[keyof typeof AppIcons]
