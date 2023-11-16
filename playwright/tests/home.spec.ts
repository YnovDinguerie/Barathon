import { test, expect } from '@playwright/test';
import { ARRETER, BARS_RESTANT, CONNEXION, DEMARRER_BARATHON, DEMARRER_PARTIE, NOMBRE_BAR_VISITER, RAYON_BARATHON, REVENIR_ARRIERE, TEMPS_TOTAL } from '../constantes/global';

const numberOfClick = 4;
const delayBetweenClicks = 200;

const barFavori = 'La Cervoiserie';

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
  CONNEXION(page)
  await page.getByText(DEMARRER_BARATHON).click()
  await expect(page.getByText(NOMBRE_BAR_VISITER)).toBeVisible()
  await expect(page.getByText(RAYON_BARATHON)).toBeVisible()
  await page.getByText(REVENIR_ARRIERE).click()
  await expect(page.getByText(DEMARRER_BARATHON)).toBeVisible()
});

test('Ajouter un favori', async ({ page }) => {
  CONNEXION(page)
  await page.locator('input[id="destinationInput"]').fill(barFavori)
  await page.locator('img[alt="search icon"]').click()
  await expect(page.getByText(barFavori).first()).toBeVisible()
  await page.locator('img[alt="Add to favorite"]').first().click()
// a finir avec l'ajout de favori pleinement fonctionnel
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

