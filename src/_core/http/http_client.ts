export type HttpRequestOptions = {
  headers?: Record<string, string>
  query?: Record<string, string | number | boolean | null | undefined>
}

export interface HttpClient {
  get<T>(path: string, options?: HttpRequestOptions): Promise<T>
  post<T>(
    path: string,
    body?: unknown,
    options?: HttpRequestOptions
  ): Promise<T>
}

