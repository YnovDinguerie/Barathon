import { test, expect } from '@playwright/test';
import { LOGIN } from '../../constantes/global';

const account = {
    email: 'leo.dfssdfdsf',
    password: 'coucou33_'
}

test('Check wrong login', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="email"]').fill(account.email)
    await page.locator('input[name="password"]').fill(account.password)
    await page.locator('button').getByText(LOGIN).click()
    await expect(page.locator('.toast-Error')).toBeVisible()
  });

  test('Check correct login', async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });