import { expect, test } from '@playwright/test'

test('loads, pauses, restarts, and switches levels', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await page.getByRole('link', { name: 'Start', exact: true }).click()
  await page.getByRole('button', { name: 'Where Do I Go?', exact: true }).click()

  const canvas = page.locator('#game-layer canvas')
  await expect(canvas).toBeVisible()
  await expect.poll(async () => Number(await canvas.getAttribute('width'))).toBeGreaterThan(0)

  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'RESUME', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'RESUME', exact: true }).click()
  await expect(page.getByRole('button', { name: 'RESUME', exact: true })).toBeHidden()

  await page.keyboard.press('r')
  await expect(page.getByText('ARE YOU SURE YOU WANT TO RESTART?')).toBeVisible()
  await page.getByRole('button', { name: 'Yes', exact: true }).click()
  await expect(page.getByText('ARE YOU SURE YOU WANT TO RESTART?')).toBeHidden()

  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'RETURN TO MENU', exact: true }).click()
  await page.getByRole('button', { name: 'Now What Is This?', exact: true }).click()
  await expect(canvas).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'RESUME', exact: true })).toBeVisible()

  expect(errors).toEqual([])
})
