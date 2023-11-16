import { test, expect } from '@playwright/test';
import { STOP, BARS_REMAINING, login, START_BARATHON, START_PARTY, BAR_VISITED, RADIUS_BARATHON, GOING_BACK, TOTAL_TIME, CLOSE } from '../constantes/global';

const numberOfClick = 4;
const delayBetweenClicks = 200;
const barFavori = 'La Cervoiserie';

test('Démarrer un barathon', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await page.getByText(START_BARATHON).click()
  await expect(page.getByText(BAR_VISITED)).toBeVisible()
  await expect(page.getByText(RADIUS_BARATHON)).toBeVisible()
  await page.locator('.start-barathon').getByText(START_PARTY).click()
  await expect(page.getByText(TOTAL_TIME)).toBeVisible()
  await expect(page.getByText(STOP)).toBeVisible()
  await expect(page.getByText(BARS_REMAINING)).toBeVisible()
  await page.getByText(STOP).click()
  await expect(page.getByText(TOTAL_TIME)).not.toBeVisible()
  await expect(page.getByText(STOP)).not.toBeVisible()
  await expect(page.getByText(BARS_REMAINING)).not.toBeVisible()
  await expect(page.getByText(START_BARATHON)).toBeVisible()
});

test('Retour en arrière', async ({ page }) => {
  login(page)
  await page.getByText(START_BARATHON).click()
  await expect(page.getByText(BAR_VISITED)).toBeVisible()
  await expect(page.getByText(RADIUS_BARATHON)).toBeVisible()
  await page.getByText(GOING_BACK).click()
  await expect(page.getByText(START_BARATHON)).toBeVisible()
});

test('Ajouter un favori', async ({ page }) => {
  login(page)
  await page.locator('input[id="destinationInput"]').fill(barFavori)
  await page.locator('img[alt="search icon"]').click()
  await expect(page.getByText(barFavori).first()).toBeVisible()
  await page.locator('img[alt="Add to favorite"]').first().click()
// a finir avec l'ajout de favori pleinement fonctionnel
});

test('Easter Egg', async ({ page }) => {
  const popUp = page.locator('.pop-up')
  await page.goto('http://localhost:3000/home');
  await Promise.all(
      Array.from({ length: numberOfClick }).map(async () => {
          await page.locator('.container-app').click();
          await page.waitForTimeout(delayBetweenClicks)
      })
  )
  await expect(popUp).toBeVisible()
  await page.locator('button').getByText(CLOSE).click()
  await expect(popUp).not.toBeVisible()
});