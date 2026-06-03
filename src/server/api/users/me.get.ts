import { Constants } from '@core/constants'
import { joinURL } from 'ufo'
import { createError, getCookie, getHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const authorization = getHeader(event, 'authorization')
  const token =
    getCookie(event, Constants.authTokenCookie) ??
    authorization?.replace(/^Bearer\s+/i, '')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  const config = useRuntimeConfig(event)
  return await $fetch(joinURL(config.apiUpstream, 'users/me'), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})
