import { Constants } from '@core/constants'
import type {
  ApiDataResponse,
  LoginResponseData,
  UserDto
} from '@modules/auth/data/models/api_types'
import { joinURL } from 'ufo'
import { readBody, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const response = await $fetch<ApiDataResponse<LoginResponseData>>(
    joinURL(config.apiUpstream, 'users/login'),
    {
      method: 'POST',
      body
    }
  )

  const token = response.data?.token
  if (!token) return response

  setCookie(event, Constants.authTokenCookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })

  const userResponse = await $fetch<ApiDataResponse<UserDto>>(
    joinURL(config.apiUpstream, 'users/me'),
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return {
    data: {
      user: userResponse.data
    }
  }
})
