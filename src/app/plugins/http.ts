import type {
  HttpClient,
  HttpRequestOptions
} from '../../_core/http/http_client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const client: HttpClient = {
    async get<T>(path: string, options?: HttpRequestOptions) {
      return await $fetch<T>(path, {
        baseURL,
        method: 'GET',
        headers: options?.headers,
        query: options?.query
      })
    },
    async post<T>(path: string, body?: unknown, options?: HttpRequestOptions) {
      return await $fetch<T>(path, {
        baseURL,
        method: 'POST',
        headers: options?.headers,
        query: options?.query,
        body: body as any
      })
    }
  }

  return {
    provide: {
      http: client
    }
  }
})

