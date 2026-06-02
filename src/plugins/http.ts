import { Constants } from '@core/constants'
import type { HttpClient, HttpRequestOptions } from '@core/http/http_client'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

function authHeaders(
  token: string | null | undefined,
  headers?: Record<string, string>
): Record<string, string> | undefined {
  if (!token) return headers
  return {
    ...headers,
    Authorization: `Bearer ${token}`
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  async function request<T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
    options?: HttpRequestOptions
  ) {
    // Read cookie on each request so a token set during login is visible immediately.
    const token = useCookie<string | null>(Constants.authTokenCookie).value
    const headers =
      options?.headers?.Authorization != null
        ? options.headers
        : authHeaders(token, options?.headers)

    return await $fetch<T>(path, {
      baseURL,
      method,
      headers,
      query: options?.query,
      body: body as BodyInit | Record<string, unknown> | null | undefined
    })
  }

  const client: HttpClient = {
    get<T>(path: string, options?: HttpRequestOptions) {
      return request<T>(path, 'GET', undefined, options)
    },
    post<T>(path: string, body?: unknown, options?: HttpRequestOptions) {
      return request<T>(path, 'POST', body, options)
    },
    put<T>(path: string, body?: unknown, options?: HttpRequestOptions) {
      return request<T>(path, 'PUT', body, options)
    },
    patch<T>(path: string, body?: unknown, options?: HttpRequestOptions) {
      return request<T>(path, 'PATCH', body, options)
    },
    delete<T>(path: string, options?: HttpRequestOptions) {
      return request<T>(path, 'DELETE', undefined, options)
    }
  }

  return {
    provide: {
      http: client
    }
  }
})
