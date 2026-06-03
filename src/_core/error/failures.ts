/**
 * Typed failures shared across layers. Mirrors the Flutter starter's
 * `_core/error/failures.dart` (`Failure`, `ServerFailure`, `CacheFailure`,
 * `ConnectionFailure`). Use these instead of throwing bare `Error`s so the UI
 * can branch on failure type and render a consistent message.
 */
export abstract class Failure extends Error {
  constructor(message: string) {
    super(message)
    this.name = new.target.name
  }

  getMessage(): string {
    return this.message
  }
}

/** Domain/input validation failed (e.g. missing required field). */
export class ValidationFailure extends Failure {}

/** Local persistence (cookie / localStorage) could not be read or written. */
export class CacheFailure extends Failure {
  constructor(message = 'Failed to read local data') {
    super(message)
  }
}

/** Device is offline or the request never reached the server. */
export class ConnectionFailure extends Failure {
  constructor(message = 'No internet connection') {
    super(message)
  }
}

/** The server responded with an error (carries the HTTP status when known). */
export class ServerFailure extends Failure {
  readonly statusCode?: number

  constructor(message = 'Oops, something went wrong', statusCode?: number) {
    super(message)
    this.statusCode = statusCode
  }
}

/** Resolve a user-facing message from any thrown value. */
export function failureMessage(
  err: unknown,
  fallback = 'Unexpected error'
): string {
  if (err instanceof Failure) return err.getMessage()
  if (err instanceof Error && err.message) return err.message
  return fallback
}
