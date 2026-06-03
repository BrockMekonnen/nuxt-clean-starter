import { Constants } from '@core/constants'
import { deleteCookie } from 'h3'

export default defineEventHandler((event) => {
  deleteCookie(event, Constants.authTokenCookie, {
    path: '/'
  })

  return { ok: true }
})
