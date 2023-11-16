import { test, expect } from '@playwright/test';
import { HOMEURL, LOGIN, REGISTERURL, TEXTERROR } from '../../constantes/global';

const account = {
    email: 'leo.dfssdfdsf',
    password: 'coucou33_'
}

const validAccount = {
  email: 'loicbozon@gmail.Com',
  password: '1234A!aa'
}

test('Check wrong login', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="email"]').fill(account.email)
    await page.locator('input[name="password"]').fill(account.password)
    await page.locator('button').getByText(LOGIN).click()
    await expect(page.locator('.toast-Error')).toBeVisible()
    await expect(page.textContent('.toast-Error')).toBe(TEXTERROR)
    await page.locator('.toast-Error .close').click()
    await expect(page.locator('.toast-Error')).not.toBeVisible()
  });

  test('Check correct login', async ({ page }) => { 
    await page.goto('http://localhost:3000/');
    await page.locator('input[name="email"]').fill(validAccount.email)
    await page.locator('input[name="password"]').fill(validAccount.password)
    await page.locator('button').getByText(LOGIN).click()
    await page.waitForNavigation()
    await expect(page.url()).toBe(HOMEURL)
  });

  test('Check Navigation', async ({ page }) => { 
    await page.goto('http://localhost:3000/');
    await page.getByText('Register').click()
    await page.waitForNavigation()
    await expect(page.url()).toBe(REGISTERURL)
  });