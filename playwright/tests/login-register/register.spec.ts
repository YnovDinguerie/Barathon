import { test, expect } from '@playwright/test';
import { HOMEURL, LOGIN, LOGINURL, REGISTER, REGISTERERROR, REGISTERURL, TEXTERROR } from '../../constantes/global';

const account = {
    name: 'leo',
    email: 'leo.dfssdfdsf@gmail.com',
    password: 'coucou33_',
    wrongconfirmpwd : 'couc33',
    birthdate : '1933-04-04',
}

const validAccount = {
    name: 'loic bozon',
    email: 'loicbozon@gmail.Com',
    password: '1234A!aa',
    confirmpwd : '1234A!aa',
    birthdate : '1927-04-04',
  }
  
  const linkSelector = 'a[href="/auth/login"]';


test('Check wrong register', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/register');
    await page.locator('input[name="name"]').fill(account.name)
    await page.locator('input[name="email"]').fill(account.email)
    await page.locator('input[name="password"]').fill(account.password)
    await page.locator('input[name="c_password"]').fill(account.wrongconfirmpwd)
    await page.locator('input[name="birthdate"]').fill(account.birthdate)
    await page.locator('button').getByText(REGISTER).click()
    await expect(page.locator('.toast toast-Error')).toBeVisible()
    await expect(page.textContent('.toast toast-Error')).toBe(REGISTERERROR)
    await page.locator('.toast toast-Error .close').click()
    await expect(page.locator('.toast toast-Error')).not.toBeVisible()
  });

  test('Check wrong register', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/register');
    await page.locator('input[name="name"]').fill(validAccount.name)
    await page.locator('input[name="email"]').fill(validAccount.email)
    await page.locator('input[name="password"]').fill(validAccount.password)
    await page.locator('input[name="c_password"]').fill(validAccount.confirmpwd)
    await page.locator('input[name="birthdate"]').fill(validAccount.birthdate)
    await page.locator('button').getByText(REGISTER).click()
    await expect(page.url()).toBe(HOMEURL)
  });

  test('Check Navigation', async ({ page }) => { 
    await page.goto('http://localhost:3000/auth/register');
    await page.locator(linkSelector).getByText('Register').click()
    await page.waitForNavigation()
    await expect(page.url()).toBe(LOGINURL)
  });