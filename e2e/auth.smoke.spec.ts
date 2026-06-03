import { test, expect } from '@playwright/test'
import { mockAuthApi } from './helpers/auth_api_mock'

test.describe('auth smoke', () => {
  test('signs in and lands on home', async ({ page }) => {
    await mockAuthApi(page)
    await page.goto('/login')

    await page
      .getByRole('textbox', { name: /email/i })
      .fill('jane.doe@test.com')
    await page.locator('input[type="password"]').fill('test@test12')
    await page.getByRole('button', { name: /sign in/i }).click()

    await expect(page).toHaveURL(/\/home/)
    await expect(
      page.getByRole('main').getByText(/hello,\s*jane/i)
    ).toBeVisible()
  })
})
