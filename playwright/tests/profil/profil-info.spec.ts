import { test, expect } from '@playwright/test';
import { navProfil, ACCOUNT_INFO, USER_NAME, EMAIL, EDIT, EDIT_MDP, BIRTHDATE, INFORMATIONS, PROFIL, RANDOM_ACCOUNT, ERROR404 } from '../../constantes/global';

test('modification du profil', async ({ page }) => {
    navProfil(page)
    await page.locator('img[alt="arrow"]').nth(1).click()
    await expect(page.getByText(ACCOUNT_INFO)).toBeVisible()
    await expect(page.getByText(USER_NAME).last()).toBeVisible()
    await expect(page.getByText(EMAIL)).toBeVisible()
    await expect(page.getByText(BIRTHDATE)).toBeVisible()
    await expect(page.getByText(EDIT).first()).toBeVisible()
    await expect(page.getByText(EDIT_MDP).last()).toBeVisible()
    await expect(page.getByText(INFORMATIONS)).toBeVisible()
    await page.locator('img[alt="arrow"]').click()
    await expect(page.getByText(PROFIL).first()).toBeVisible()
});

test('modification des infos du compte', async ({ page }) => {
    navProfil(page)
    await page.locator('img[alt="arrow"]').nth(1).click()
    await expect(page.getByText(ACCOUNT_INFO)).toBeVisible()
    await page.locator('input[name="name"]').fill(RANDOM_ACCOUNT.username)
    await page.locator('input[name="email"]').fill(RANDOM_ACCOUNT.email)
    await page.locator('input[name="birthdate"]').fill(RANDOM_ACCOUNT.birthdate)
    await page.locator('button').getByText(EDIT).click()
    await expect(page.locator('.toast-Error')).not.toBeVisible()
});

test('Erreur modification des infos du compte', async ({ page }) => {
    navProfil(page)
    await page.locator('img[alt="arrow"]').nth(1).click()
    await expect(page.getByText(ACCOUNT_INFO)).toBeVisible()
    await page.locator('input[name="name"]').fill(RANDOM_ACCOUNT.username)
    await page.locator('input[name="email"]').fill(RANDOM_ACCOUNT.email)
    await page.locator('input[name="birthdate"]').fill(RANDOM_ACCOUNT.email)
    await page.locator('button').getByText(EDIT).click()
    await expect(page.locator('.toast-Error')).toBeVisible()
});

test('modification mot de passe', async ({ page }) => {
    navProfil(page)
    await page.locator('img[alt="arrow"]').nth(1).click()
    await expect(page.getByText(ACCOUNT_INFO)).toBeVisible()
    await page.locator('a[href="/auth/reset-password"]').getByText(ERROR404).click()
});