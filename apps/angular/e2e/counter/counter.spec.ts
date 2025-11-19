import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

function setup(page: Page) {
  const count: Locator = page.locator('p')
  const plusButton: Locator = page.getByRole('button', { name: '+' })
  const minusButton: Locator = page.getByRole('button', { name: '-' })
  const resetButton: Locator = page.getByRole('button', { name: 'Reset' })

  return {
    count,
    plusButton,
    minusButton,
    resetButton,
  }
}

test.describe('Counter Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/counter')
  })

  test('should display initial count of 0', async ({ page }) => {
    const { count } = setup(page)
    await expect(count).toHaveText('0')
  })

  test('should increment count when + button is clicked', async ({ page }) => {
    const { plusButton, count } = setup(page)

    await plusButton.click()
    await expect(count).toHaveText('1')
  })

  test('should decrement count when - button is clicked', async ({ page }) => {
    const { minusButton, count } = setup(page)

    await minusButton.click()
    await expect(count).toHaveText('-1')
  })

  test('should reset count when Reset button is clicked', async ({ page }) => {
    const { plusButton, resetButton, count } = setup(page)

    await plusButton.click()
    await plusButton.click()
    await expect(count).toHaveText('2')

    await resetButton.click()
    await expect(count).toHaveText('0')
  })
})
