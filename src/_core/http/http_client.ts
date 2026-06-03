export type HttpRequestOptions = {
  headers?: Record<string, string>
  query?: Record<string, string | number | boolean | null | undefined>
  /**
   * Optional Bearer token for this request. When omitted, the HTTP client reads the
   * auth cookie on each call (interceptor-style, like Flutter's Dio `onRequest`).
   */
  authToken?: string
}

export interface HttpClient {
  get<T>(path: string, options?: HttpRequestOptions): Promise<T>
  post<T>(
    path: string,
    body?: unknown,
    options?: HttpRequestOptions
  ): Promise<T>
  put<T>(path: string, body?: unknown, options?: HttpRequestOptions): Promise<T>
  patch<T>(
    path: string,
    body?: unknown,
    options?: HttpRequestOptions
  ): Promise<T>
  delete<T>(path: string, options?: HttpRequestOptions): Promise<T>
}
