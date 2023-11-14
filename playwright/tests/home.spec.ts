import { test, expect } from '@playwright/test';
import { PROFILEURL } from '../constantes/global';


const imageSelector = 'img[class="user-profile"]';
const button = 'Démarrer un barathon';
const numberOfClick = 4;
const delayBetweenClicks = 200;

test('Démarrer un barathon', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    await page.locator('button').getByText(button).click()
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

  test('Check Navigation profil', async ({ page }) => { 
    await page.goto('http://localhost:3000/home');
    await page.locator(imageSelector).click()
    await page.waitForNavigation()
    await expect(page.url()).toBe(PROFILEURL)
  });
