export class ApiError extends Error {
  readonly statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }

  /** Normalize any thrown value (including `$fetch` `FetchError`) into an `ApiError`. */
  static from(err: unknown): ApiError {
    if (err instanceof ApiError) return err
    return new ApiError(parseFetchError(err), parseFetchStatus(err))
  }
}

/** Best-effort status-code extraction from a `$fetch` error or `Response`-like object. */
export function parseFetchStatus(err: unknown): number | undefined {
  if (!err || typeof err !== 'object') return undefined
  const candidate = err as {
    statusCode?: number
    status?: number
    response?: { status?: number }
  }
  return candidate.statusCode ?? candidate.status ?? candidate.response?.status
}

export function parseFetchError(err: unknown): string {
  if (err && typeof err === 'object' && 'data' in err) {
    const data = (err as { data?: unknown }).data
    if (data && typeof data === 'object') {
      const message = (data as { message?: string }).message
      if (message) return message
      const error = (data as { error?: string }).error
      if (error) return error
    }
  }

  if (err instanceof Error && err.message) {
    return err.message
  }

  return 'Unexpected error'
}
