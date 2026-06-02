import type { HttpClient } from '../shared/http/httpClient'

declare module '#app' {
  interface NuxtApp {
    $http: HttpClient
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: HttpClient
  }
}

export {}

