import { test, expect } from '@playwright/test';
import { CREATE_YOUR_ACCOUNT, FORGOT_PASSWORD, LOGIN, LOGIN_INTO_ACCOUNT, REGISTER, RESET_YOUR_PASSWORD, VALID_ACCOUNT } from '../../constantes/global';

const ACCOUNT = {
    email: 'leo.dfssdfdsf',
    password: 'coucou33_'
}

test('Check wrong login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="email"]').fill(ACCOUNT.email)
  await page.locator('input[name="password"]').fill(ACCOUNT.password)
  await page.locator('button').getByText(LOGIN).click()
  await expect(page.locator('.toast-Error')).toBeVisible({timeout: 90000})
});

test('Check correct login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="email"]').fill(VALID_ACCOUNT.email)
  await page.locator('input[name="password"]').fill(VALID_ACCOUNT.password)
  await page.locator('button').getByText(LOGIN).click()
  await expect(page.getByText(LOGIN_INTO_ACCOUNT)).not.toBeVisible()
});

test('Check Navigation', async ({ page }) => { 
  await page.goto('http://localhost:3000/');
  await page.getByText(REGISTER).click()
  await expect(page.getByText(CREATE_YOUR_ACCOUNT)).toBeVisible()
  await expect(page.getByText(LOGIN_INTO_ACCOUNT)).not.toBeVisible()
});

test('Forgot Password', async ({ page }) => { 
  await page.goto('http://localhost:3000/');
  await page.getByText(FORGOT_PASSWORD).click()
  await expect(page.getByText(RESET_YOUR_PASSWORD)).toBeVisible()
});