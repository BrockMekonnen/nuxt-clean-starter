import { ServerFailure } from '@core/error/failures'

/**
 * HTTP-layer failure. Extends `ServerFailure` so callers can treat it as a
 * generic `Failure`, while still exposing the status code for branching.
 */
export class ApiError extends ServerFailure {
  /** Normalize any thrown value (including `$fetch` `FetchError`) into an `ApiError`. */
  static from(err: unknown): ApiError {
    if (err instanceof ApiError) return err
    const statusCode = parseFetchStatus(err)
    return new ApiError(resolveMessage(err, statusCode), statusCode)
  }
}

/** Prefer the server-provided message; fall back to a status-based generic one. */
function resolveMessage(err: unknown, statusCode?: number): string {
  const serverMessage = parseFetchError(err)
  if (serverMessage !== 'Unexpected error') return serverMessage
  return messageForStatus(statusCode) ?? serverMessage
}

/** Generic message per status code (mirrors the Flutter `_handleError` map). */
export function messageForStatus(statusCode?: number): string | undefined {
  switch (statusCode) {
    case 400:
      return 'Bad request'
    case 401:
      return 'Unauthorized'
    case 403:
      return 'Forbidden'
    case 404:
      return 'Not found'
    case 409:
      return 'Conflict'
    case 422:
      return 'Validation failed'
    case 500:
      return 'Internal server error'
    case 502:
      return 'Bad gateway'
    case 503:
      return 'Service unavailable'
    default:
      return undefined
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
