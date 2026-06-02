export interface NetworkInfo {
  isConnected(): Promise<boolean>
}

export class NetworkInfoWeb implements NetworkInfo {
  async isConnected(): Promise<boolean> {
    return navigator.onLine
  }
}
