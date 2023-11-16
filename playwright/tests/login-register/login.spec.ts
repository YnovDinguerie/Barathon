import { test, expect } from '@playwright/test';
import { CREATE_YOUR_ACCOUNT, FORGOT_PASSWORD, HOME_URL, LOGIN, LOGIN_INTO_ACCOUNT, REGISTER, REGISTER_URL, RESET_YOUR_PASSWORD, TEXT_ERROR } from '../../constantes/global';

const account = {
    email: 'leo.dfssdfdsf',
    password: 'coucou33_'
}

const validAccount = {
  email: 'loicbozon@gmail.com',
  password: '1234A!aa'
}

test('Check wrong login', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="email"]').fill(account.email)
    await page.locator('input[name="password"]').fill(account.password)
    await page.locator('button').getByText(LOGIN).click()
    await expect(page.locator('.toast-Error').getByText(TEXT_ERROR)).toBeVisible()
    await page.locator('.toast-Error .close').click()
    await expect(page.locator('.toast-Error')).not.toBeVisible()
  });

  test('Check correct login', async ({ page }) => { 
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="email"]').fill(validAccount.email)
    await page.locator('input[name="password"]').fill(validAccount.password)
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