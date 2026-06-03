import type { Page } from '@playwright/test'

const mockUser = {
  id: 'e2e-user-1',
  firstName: 'Jane',
  lastName: 'Doe',
  phone: '+10000000000',
  email: 'jane.doe@test.com',
  isEmailVerified: true,
  roles: ['user']
}

/** Mock auth API so e2e runs without the Go backend. */
export async function mockAuthApi(page: Page) {
  await page.route('**/api/users/login', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue()
      return
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: { token: 'e2e-test-token' } })
    })
  })

  await page.route('**/api/users/me', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue()
      return
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: mockUser })
    })
  })
}
