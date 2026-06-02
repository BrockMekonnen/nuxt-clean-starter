import { NetworkInfoWeb } from '@core/network/network_info'
import { TOKENS } from '@core/di/tokens'

export default defineNuxtPlugin(() => {
  const { $di } = useNuxtApp()

  $di.register(TOKENS.NetworkInfo, { useClass: NetworkInfoWeb })

  useNetworkStore().bindBrowserEvents()
})
