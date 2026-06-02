const STORAGE_KEY = 'theme'

type Theme = 'dark' | 'light'

function getPreferredTheme(): Theme {
  if (!import.meta.client) return 'dark'
  return window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

function applyTheme(theme: Theme) {
  if (!import.meta.client) return
  document.documentElement.dataset.theme = theme
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null
    applyTheme(saved ?? getPreferredTheme())
  }

  return {
    provide: {
      theme: {
        get(): Theme {
          if (!import.meta.client) return 'dark'
          return (document.documentElement.dataset.theme as Theme) || 'dark'
        },
        set(theme: Theme) {
          if (!import.meta.client) return
          localStorage.setItem(STORAGE_KEY, theme)
          applyTheme(theme)
        },
        toggle() {
          if (!import.meta.client) return
          const next: Theme = this.get() === 'dark' ? 'light' : 'dark'
          localStorage.setItem(STORAGE_KEY, next)
          applyTheme(next)
        }
      }
    }
  }
})
