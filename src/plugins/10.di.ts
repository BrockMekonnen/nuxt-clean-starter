import 'reflect-metadata'
import { createAppContainer } from '@core/di/container'
import { TOKENS } from '@core/di/tokens'
import { initBeforeAppRun } from '@core/_init_modules'

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
