import { test, expect } from '@playwright/test';
import { PROFIL, KM, STATISTICS, navProfilStats } from '../../constantes/global';

test('acceder aux stats', async ({ page }) => {
    await navProfilStats(page)
})

test('Tester les statistiques', async ({ page }) => {
    await navProfilStats(page)
    await expect(page.getByText(KM)).toBeVisible()
    await page.locator('img[alt="arrow"]').click()
    await expect(page.getByText(PROFIL).first()).toBeVisible()
});