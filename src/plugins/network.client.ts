import { NetworkInfoWeb } from '../_core/network/network_info'
import { TOKENS } from '../_core/di/tokens'

export default defineNuxtPlugin(() => {
  const { $di } = useNuxtApp()

  $di.register(TOKENS.NetworkInfo, { useClass: NetworkInfoWeb })

  useNetworkStore().bindBrowserEvents()
})
