import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { validateRuntimeEnv } from '../validate_runtime_env'

const env = process.env

describe('validateRuntimeEnv', () => {
  beforeEach(() => {
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it('accepts defaults (/api + upstream URL)', () => {
    delete process.env.NUXT_PUBLIC_API_BASE
    delete process.env.NUXT_API_UPSTREAM

    const result = validateRuntimeEnv()

    expect(result.apiBase).toBe('/api')
    expect(result.apiUpstream).toBe('http://127.0.0.1:9090/api')
  })

  it('rejects an invalid upstream URL', () => {
    process.env.NUXT_API_UPSTREAM = 'not-a-url'

    expect(() => validateRuntimeEnv()).toThrow()
  })

  it('rejects an empty public api base', () => {
    process.env.NUXT_PUBLIC_API_BASE = '   '

    expect(() => validateRuntimeEnv()).toThrow()
  })
})
