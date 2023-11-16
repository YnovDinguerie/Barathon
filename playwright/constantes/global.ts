import { Page } from "playwright-core";

export const LOGIN = 'Login'
export const REGISTER = 'Register'
export const TEXT_ERROR = 'Error'
// export const HOME_URL = 'http://localhost:3000/home'
// export const REGISTER_URL = 'http://localhost:3000/auth/register'
// export const LOGIN_URL = 'http://localhost:3000/auth/login'
// export const PROFILE_URL = 'http://localhost:3000/profile'
export const LOGIN_INTO_ACCOUNT = 'Log in into you account';
export const CREATE_YOUR_ACCOUNT = 'Create you account';
export const FORGOT_PASSWORD = 'Forgot password ?';
export const RESET_YOUR_PASSWORD = 'Reset your password';
export const CONNECT_WITH_GOOGLE = 'Connect with Google';
export const DEMARRER_BARATHON = 'Démarrer un barathon';
export const DEMARRER_PARTIE = 'Démarrer la partie';
export const NOMBRE_BAR_VISITER = 'Nombre de bars à visiter';
export const RAYON_BARATHON = 'Rayon du Barathon (en km)';
export const TEMPS_TOTAL = 'Temps total';
export const ARRETER = 'Arrêter';
export const BARS_RESTANT = 'Bars restant';
export const REVENIR_ARRIERE = 'Revenir en arrière';
export const PROFIL = 'Profil';
export const MODIFICATION_PROFIL = 'Modification du profil';
export const GESTION_BARATHONS = 'Gestion des Barathons';
export const STATISTIQUES = 'Statistiques';
export const DECONNECTER = 'Se déconnecter';




export const VALID_ACCOUNT = {
    email: 'loicbozon@gmail.com',
    password: '1234A!aa'
};


export async function CONNEXION(page: Page): Promise<void> {
    await page.goto('http://localhost:3000/auth/login');
    await page.locator('input[name="email"]').fill(VALID_ACCOUNT.email)
    await page.locator('input[name="password"]').fill(VALID_ACCOUNT.password)
    await page.locator('button').getByText(LOGIN).click()
};

export async function NAV_PROFIL(page: Page): Promise<void> {
    await page.goto('http://localhost:3000/auth/login');
    await page.locator('input[name="email"]').fill(VALID_ACCOUNT.email)
    await page.locator('input[name="password"]').fill(VALID_ACCOUNT.password)
    await page.locator('button').getByText(LOGIN).click()
    await page.locator('.user-profile').click()
};