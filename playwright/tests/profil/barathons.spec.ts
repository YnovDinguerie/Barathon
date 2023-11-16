import { test, expect } from '@playwright/test';
import { navProfil, PROFIL, EDIT_PROFIL, GESTION_BARATHONS, CREATE_BARATHONS } from '../../constantes/global';

test('Tester la gestion des barathons', async ({ page }) => {
    navProfil(page)
    await page.locator('img[alt="arrow"]').nth(1).click()
    await expect(page.getByText(GESTION_BARATHONS)).toBeVisible()
    await expect(page.getByText(CREATE_BARATHONS).last()).toBeVisible()
    await page.locator('img[alt="arrow"]').click()
    await expect(page.getByText(PROFIL).first()).toBeVisible()
});