const STORAGE_KEY = 'theme'

type Theme = 'dark' | 'light'

function getPreferredTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

export default defineNuxtPlugin(() => {
  const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null
  applyTheme(saved ?? getPreferredTheme())

  return {
    provide: {
      theme: {
        get(): Theme {
          return (document.documentElement.dataset.theme as Theme) || 'dark'
        },
        set(theme: Theme) {
          localStorage.setItem(STORAGE_KEY, theme)
          applyTheme(theme)
        },
        toggle() {
          const next: Theme =
            ((document.documentElement.dataset.theme as Theme) || 'dark') ===
            'dark'
              ? 'light'
              : 'dark'
          localStorage.setItem(STORAGE_KEY, next)
          applyTheme(next)
        }
      }
    }
  }
})

