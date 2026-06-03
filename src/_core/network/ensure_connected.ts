import { ConnectionFailure } from '@core/error/failures'

/** Throws [ConnectionFailure] when the browser reports offline (client only). */
export function ensureConnected(): void {
  if (!import.meta.client) return
  if (!useNetworkStore().isOnline) {
    throw new ConnectionFailure()
  }
}
