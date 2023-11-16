import { test, expect } from '@playwright/test';
import { ARRETER, BARS_RESTANT, DEMARRER_BARATHON, DEMARRER_PARTIE, LOGIN, NOMBRE_BAR_VISITER, RAYON_BARATHON, REVENIR_ARRIERE, TEMPS_TOTAL, VALID_ACCOUNT } from '../constantes/global';

const numberOfClick = 4;
const delayBetweenClicks = 200;


test('Démarrer un barathon', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await page.getByText(DEMARRER_BARATHON).click()
  await expect(page.getByText(NOMBRE_BAR_VISITER)).toBeVisible()
  await expect(page.getByText(RAYON_BARATHON)).toBeVisible()
  await page.locator('.start-barathon').getByText(DEMARRER_PARTIE).click()
  await expect(page.getByText(TEMPS_TOTAL)).toBeVisible()
  await expect(page.getByText(ARRETER)).toBeVisible()
  await expect(page.getByText(BARS_RESTANT)).toBeVisible()
  await page.getByText(ARRETER).click()
  await expect(page.getByText(TEMPS_TOTAL)).not.toBeVisible()
  await expect(page.getByText(ARRETER)).not.toBeVisible()
  await expect(page.getByText(BARS_RESTANT)).not.toBeVisible()
  await expect(page.getByText(DEMARRER_BARATHON)).toBeVisible()
});

test('Retour en arrière', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.locator('input[name="email"]').fill(VALID_ACCOUNT.email)
  await page.locator('input[name="password"]').fill(VALID_ACCOUNT.password)
  await page.locator('button').getByText(LOGIN).click()
  await page.getByText(DEMARRER_BARATHON).click()
  await expect(page.getByText(NOMBRE_BAR_VISITER)).toBeVisible()
  await expect(page.getByText(RAYON_BARATHON)).toBeVisible()
  // await page.locator('.back-menu').click()
  await page.getByText(REVENIR_ARRIERE).click()
  // await expect(page.getByText(DEMARRER_BARATHON)).toBeVisible()
  // await expect(page.locator('.search icon')).toBeVisible() 
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
