import 'reflect-metadata'
import { createAppContainer } from '../../_core/di/container'
import { TOKENS } from '../../_core/di/tokens'
import { initBeforeAppRun } from '../../_core/_init_modules'

export default defineNuxtPlugin(() => {
  const di = createAppContainer()

  const { $http } = useNuxtApp()
  di.register(TOKENS.HttpClient, { useValue: $http })

  initBeforeAppRun(di)

  return {
    provide: {
      di
    }
  }
})

