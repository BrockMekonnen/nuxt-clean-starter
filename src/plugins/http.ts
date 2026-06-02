import { Constants } from '../_core/constants'
import type {
  HttpClient,
  HttpRequestOptions
} from '../_core/http/http_client'

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
    method: 'GET' | 'POST',
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
    }
  }

  return {
    provide: {
      http: client
    }
  }
})
