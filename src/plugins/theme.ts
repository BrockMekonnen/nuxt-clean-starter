import {
  isTheme,
  THEME_COOKIE_NAME,
  THEME_STORAGE_KEY,
  type Theme
} from '@core/theme/constants'

function systemTheme(): Theme {
  if (!import.meta.client) return 'dark'
  return window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

function readThemeFromDom(): Theme {
  if (!import.meta.client) return 'dark'
  const value = document.documentElement.dataset.theme
  return isTheme(value) ? value : systemTheme()
}

function applyTheme(theme: Theme) {
  if (!import.meta.client) return
  document.documentElement.dataset.theme = theme
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  const cookie = useCookie<Theme>(THEME_COOKIE_NAME, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  })
  cookie.value = theme
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Inline head script already set data-theme; align storage + cookie.
    const theme = readThemeFromDom()
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (isTheme(stored) && stored !== theme) {
      applyTheme(stored)
    } else {
      applyTheme(theme)
    }
  }

  return {
    provide: {
      theme: {
        get(): Theme {
          return readThemeFromDom()
        },
        set(theme: Theme) {
          applyTheme(theme)
        },
        toggle() {
          const next: Theme = readThemeFromDom() === 'dark' ? 'light' : 'dark'
          applyTheme(next)
        }
      }
    }
  }
})
