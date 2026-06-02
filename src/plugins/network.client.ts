import { NetworkInfoWeb } from '../_core/network/network_info'
import { TOKENS } from '../_core/di/tokens'
import { useNetworkStatus } from '../_core/network/use_network_status'

export default defineNuxtPlugin(() => {
  const { $di } = useNuxtApp()

  $di.register(TOKENS.NetworkInfo, { useClass: NetworkInfoWeb })

  useNetworkStatus()
})
