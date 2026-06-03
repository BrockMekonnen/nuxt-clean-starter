/**
 * Returns an in-app path for post-login navigation, or `fallback` when missing/unsafe.
 */
export function safeRedirectPath(
  candidate: string | undefined | null,
  fallback: string
): string {
  if (!candidate || !candidate.startsWith('/') || candidate.startsWith('//')) {
    return fallback
  }
  return candidate
}
