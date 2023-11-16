import { test, expect } from '@playwright/test';
import { navProfil, PROFIL, KM, STATISTICS } from '../../constantes/global';

test('Tester les statistiques', async ({ page }) => {
    navProfil(page)
    await page.locator('img[alt="arrow"]').nth(2).click()
    await expect(page.getByText(STATISTICS)).toBeVisible()
    await expect(page.getByText(KM)).toBeVisible()
    await page.locator('img[alt="arrow"]').click()
    await expect(page.getByText(PROFIL).first()).toBeVisible()
});