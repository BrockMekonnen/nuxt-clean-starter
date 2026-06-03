import { Constants } from '@core/constants'
import type { HttpClient, HttpRequestOptions } from '@core/http/http_client'
import { ensureConnected } from '@core/network/ensure_connected'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/** Attach Bearer token when present — mirrors Flutter `HttpClient` Dio interceptor. */
function withAuthHeaders(
  token: string | null | undefined,
  headers?: Record<string, string>
): Record<string, string> | undefined {
  const merged = headers ? { ...headers } : {}
  if (token && merged.Authorization == null) {
    merged.Authorization = `Bearer ${token}`
  }
  return Object.keys(merged).length > 0 ? merged : undefined
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
    const token =
      options?.authToken ??
      useCookie<string | null>(Constants.authTokenCookie).value
    const headers = withAuthHeaders(token, options?.headers)

    ensureConnected()

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
