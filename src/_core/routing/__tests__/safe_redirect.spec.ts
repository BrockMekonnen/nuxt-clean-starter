import { describe, it, expect } from 'vitest'
import { safeRedirectPath } from '../safe_redirect'

describe('safeRedirectPath', () => {
  it('returns the path when safe', () => {
    expect(safeRedirectPath('/settings', '/home')).toBe('/settings')
  })

  it('rejects external and protocol-relative URLs', () => {
    expect(safeRedirectPath('https://evil.com', '/home')).toBe('/home')
    expect(safeRedirectPath('//evil.com', '/home')).toBe('/home')
  })

  it('falls back when empty', () => {
    expect(safeRedirectPath(null, '/home')).toBe('/home')
  })
})
