import { z } from 'zod'

const apiBaseSchema = z
  .string()
  .min(1, 'NUXT_PUBLIC_API_BASE must not be empty')
  .refine(
    (value) =>
      value.startsWith('/') || z.string().url().safeParse(value).success,
    'NUXT_PUBLIC_API_BASE must be a relative path (/api) or an absolute http(s) URL'
  )

const apiUpstreamSchema = z
  .string()
  .url('NUXT_API_UPSTREAM must be a valid URL')

export type ValidatedRuntimeEnv = {
  apiBase: string
  apiUpstream: string
}

/**
 * Validates env vars before Nuxt boots. Fails fast on misconfiguration in dev/CI/build.
 */
export function validateRuntimeEnv(): ValidatedRuntimeEnv {
  const apiBase = process.env.NUXT_PUBLIC_API_BASE ?? '/api'
  const apiUpstream =
    process.env.NUXT_API_UPSTREAM ?? 'http://127.0.0.1:9090/api'

  return {
    apiBase: apiBaseSchema.parse(apiBase),
    apiUpstream: apiUpstreamSchema.parse(apiUpstream)
  }
}
