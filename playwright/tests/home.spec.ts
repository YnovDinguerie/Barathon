import { test, expect } from '@playwright/test';
import { ARRETER, BARS_RESTANT, DEMARRER_BARATHON, DEMARRER_PARTIE, NOMBRE_BAR_VISITER, PROFILE_URL, RAYON_BARATHON, TEMPS_TOTAL } from '../constantes/global';

const numberOfClick = 4;
const delayBetweenClicks = 200;

test('Démarrer un barathon', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await page.getByText(DEMARRER_BARATHON).click()
  await expect(page.getByText(NOMBRE_BAR_VISITER)).toBeVisible({timeout: 90000})
  await expect(page.getByText(RAYON_BARATHON)).toBeVisible({timeout: 90000})
  await page.locator('.start-barathon').getByText(DEMARRER_PARTIE).click()
  await expect(page.getByText(TEMPS_TOTAL)).toBeVisible({timeout: 90000})
  await expect(page.getByText(ARRETER)).toBeVisible({timeout: 90000})
  await expect(page.getByText(BARS_RESTANT)).toBeVisible({timeout: 90000})
  await page.getByText(ARRETER).click()
  await expect(page.getByText(TEMPS_TOTAL)).not.toBeVisible({timeout: 90000})
  await expect(page.getByText(ARRETER)).not.toBeVisible({timeout: 90000})
  await expect(page.getByText(BARS_RESTANT)).not.toBeVisible({timeout: 90000})
  await expect(page.getByText(DEMARRER_BARATHON)).toBeVisible({timeout: 90000})
});



  test('Easter Egg', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    await Promise.all(
        Array.from({ length: numberOfClick }).map(async () => {
            await page.locator('.container-app').click();
            await page.waitForTimeout(delayBetweenClicks)
        })
    )
    await expect(page.locator('.pop-up')).toBeVisible()
    await page.locator('button').getByText('Fermer').click()
    await expect(page.locator('.pop-up')).not.toBeVisible()
    
  });

  // test('Check Navigation profil', async ({ page }) => { 
  //   await page.goto('http://localhost:3000/home');
  //   await page.locator('.user-profile').click()
  //   await expect(page.url()).toBe(PROFILE_URL)
  // });
