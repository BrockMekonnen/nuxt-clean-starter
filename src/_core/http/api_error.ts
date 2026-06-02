export class ApiError extends Error {
  readonly statusCode?: number

  constructor(
    message: string,
    statusCode?: number
  ) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
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
