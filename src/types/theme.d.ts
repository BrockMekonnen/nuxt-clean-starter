declare module '#app' {
  interface NuxtApp {
    $theme: {
      get(): 'dark' | 'light'
      set(theme: 'dark' | 'light'): void
      toggle(): void
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $theme: {
      get(): 'dark' | 'light'
      set(theme: 'dark' | 'light'): void
      toggle(): void
    }
  }
}

export {}

