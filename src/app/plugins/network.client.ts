import { NetworkInfoWeb } from '../../_core/network/network_info'
import { TOKENS } from '../../_core/di/tokens'
import { useNetworkStatus } from '../../_core/network/use_network_status'

export default defineNuxtPlugin(() => {
  const { $di } = useNuxtApp()

  // Register in DI so modules can depend on NetworkInfo like Flutter's _core/network_info.dart
  $di.register(TOKENS.NetworkInfo, { useClass: NetworkInfoWeb })

  // Keep a reactive state for UI concerns
  useNetworkStatus()
})

