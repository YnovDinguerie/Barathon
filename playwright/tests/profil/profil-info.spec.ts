import { test, expect } from '@playwright/test';
import { navProfilInfo, ACCOUNT_INFO, USER_NAME, EMAIL, EDIT, EDIT_MDP, BIRTHDATE, INFORMATIONS, RANDOM_ACCOUNT, RESET_PWD, PROFIL } from '../../constantes/global';

test('acceder aux infos profil', async ({ page }) => {
    navProfilInfo(page)
})

test('modification du profil', async ({ page }) => {
    navProfilInfo(page)
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
    navProfilInfo(page)
    await page.locator('input[name="name"]').fill(RANDOM_ACCOUNT.username)
    await page.locator('input[name="email"]').fill(RANDOM_ACCOUNT.email)
    await page.locator('input[name="birthdate"]').fill(RANDOM_ACCOUNT.birthdate)
    await page.locator('button').getByText(EDIT).click()
    await expect(page.locator('.toast-Error')).not.toBeVisible()
});

test('Erreur modification des infos du compte', async ({ page }) => {
    navProfilInfo(page)
    await page.locator('input[name="name"]').fill(RANDOM_ACCOUNT.username)
    await page.locator('input[name="email"]').fill(RANDOM_ACCOUNT.email)
    await page.locator('input[name="birthdate"]').fill(RANDOM_ACCOUNT.email)
    await page.locator('button').getByText(EDIT).click()
    await expect(page.locator('.toast-Error')).toBeVisible()
});

test('modification mot de passe', async ({ page }) => {
    navProfilInfo(page)
    await page.locator('a[href="/auth/reset"]').getByText(EDIT_MDP).click()
    await expect(page.getByText(RESET_PWD)).toBeVisible()
    await page.locator('input[name="email"]').fill(RANDOM_ACCOUNT.email)
    await expect(page.locator('.toast-Error')).not.toBeVisible()
});