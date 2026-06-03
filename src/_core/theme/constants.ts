export const THEME_STORAGE_KEY = 'theme'
export const THEME_COOKIE_NAME = 'theme'

export type Theme = 'dark' | 'light'

export function isTheme(value: string | null | undefined): value is Theme {
  return value === 'dark' || value === 'light'
}
