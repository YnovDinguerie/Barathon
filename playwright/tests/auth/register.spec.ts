import { test, expect } from '@playwright/test';
import { CONNECT_WITH_GOOGLE, CREATE_YOUR_ACCOUNT, LOGIN, LOGIN_INTO_ACCOUNT, RANDOM_EMAIL, REGISTER, TEXT_ERROR } from '../../constantes/global';
import { faker } from '@faker-js/faker/locale/en'

const ACCOUNT = {
    name: 'leo',
    email: 'leo.dfssdfdsf@gmail.com',
    password: 'coucou33_',
    wrongconfirmpwd : 'couc33',
    birthdate : '1933-04-04',
}

const VALID_ACCOUNT = {
  name: 'loic bozon',
  email: RANDOM_EMAIL,
  password: '1234A!aa',
  confirmpwd : '1234A!aa',
  birthdate : '1927-04-04',
}

test('Check wrong register', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/register');
    await page.locator('input[name="name"]').fill(ACCOUNT.name)
    await page.locator('input[name="email"]').fill(ACCOUNT.email)
    await page.locator('input[name="password"]').fill(ACCOUNT.password)
    await page.locator('input[name="c_password"]').fill(ACCOUNT.wrongconfirmpwd)
    await page.locator('input[name="birthdate"]').fill(ACCOUNT.birthdate)
    await page.locator('button').getByText(REGISTER).click()
    await expect(page.locator('.toast-Error .msg').getByText(TEXT_ERROR)).toBeVisible()
    await page.locator('.toast-Error .close').click()
    await expect(page.locator('.toast-Error')).not.toBeVisible()
  });

  test('Check good register', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/register');
    await page.locator('input[name="name"]').fill(VALID_ACCOUNT.name)
    await page.locator('input[name="email"]').fill(VALID_ACCOUNT.email)
    await page.locator('input[name="password"]').fill(VALID_ACCOUNT.password)
    await page.locator('input[name="c_password"]').fill(VALID_ACCOUNT.confirmpwd)
    await page.locator('input[name="birthdate"]').fill(VALID_ACCOUNT.birthdate)
    await page.locator('button').getByText(REGISTER).click()
    await expect(page.getByText(CREATE_YOUR_ACCOUNT)).not.toBeVisible()
  });

  test('Check Navigation', async ({ page }) => { 
    await page.goto('http://localhost:3000/auth/register');
    await page.getByText(LOGIN).click()
    await expect(page.getByText(CREATE_YOUR_ACCOUNT)).not.toBeVisible()
    await expect(page.getByText(LOGIN_INTO_ACCOUNT)).toBeVisible()
  });

  test('Check Register with google', async ({ page }) => { 
    await page.goto('http://localhost:3000/auth/register');
    await page.getByText(CONNECT_WITH_GOOGLE).click()
  });