import type { HttpClient } from './http_client'

export function useHttp(): HttpClient {
  const { $http } = useNuxtApp()
  return $http
}

