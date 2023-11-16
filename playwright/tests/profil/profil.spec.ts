import { test, expect } from '@playwright/test';
import { navProfil, PROFIL, EDIT_PROFIL, GESTION_BARATHONS, STATISTICS, DISCONNECT, START_BARATHON } from '../../constantes/global';

test('Tester le profil', async ({ page }) => {
    navProfil(page)
    await expect(page.getByText(PROFIL).first()).toBeVisible()
    await expect(page.getByText(EDIT_PROFIL)).toBeVisible()
    await expect(page.getByText(GESTION_BARATHONS)).toBeVisible()
    await expect(page.getByText(STATISTICS)).toBeVisible()
    await expect(page.getByText(DISCONNECT)).toBeVisible()
    await page.locator('img[alt="arrow"]').first().click()
    await expect(page.getByText(START_BARATHON)).toBeVisible()
});
