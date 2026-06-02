import type { DependencyContainer } from 'tsyringe'

declare module '#app' {
  interface NuxtApp {
    $di: DependencyContainer
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $di: DependencyContainer
  }
}

export {}

