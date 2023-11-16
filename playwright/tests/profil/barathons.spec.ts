import { test, expect } from '@playwright/test';
import { PROFIL, CREATE_BARATHONS, navProfilBarathons } from '../../constantes/global';

test('acceder aux barathons', async ({ page }) => {
    await navProfilBarathons(page)
})

test('Tester la gestion des barathons', async ({ page }) => {
    await navProfilBarathons(page)
    await expect(page.getByText(CREATE_BARATHONS).last()).toBeVisible()
    // await page.locator('img[alt="arrow"]').click()
    // await expect(page.getByText(PROFIL).first()).toBeVisible()
});

test('Tester la création des barathons', async ({ page }) => {
    await navProfilBarathons(page)
    await expect(page.getByText(CREATE_BARATHONS).last()).toBeVisible()
    await page.locator('img[alt="arrow"]').click()
    await expect(page.getByText(PROFIL).first()).toBeVisible()
});