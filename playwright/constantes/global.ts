import { Page } from "playwright-core";
import { faker } from '@faker-js/faker';

export const LOGIN = 'Login';
export const REGISTER = 'Register';
export const TEXT_ERROR = 'Error';
export const LOGIN_INTO_ACCOUNT = 'Log in into you account';
export const CREATE_YOUR_ACCOUNT = 'Create you account';
export const FORGOT_PASSWORD = 'Forgot password ?';
export const RESET_YOUR_PASSWORD = 'Reset your password';
export const CONNECT_WITH_GOOGLE = 'Connect with Google';
export const START_BARATHON = 'Démarrer un barathon';
export const START_PARTY = 'Démarrer la partie';
export const BAR_VISITED = 'Nombre de bars à visiter';
export const RADIUS_BARATHON = 'Rayon du Barathon (en km)';
export const TOTAL_TIME = 'Temps total';
export const STOP = 'Arrêter';
export const BARS_REMAINING = 'Bars restant';
export const GOING_BACK = 'Revenir en arrière';
export const PROFIL = 'Profil';
export const EDIT_PROFIL = 'Modification du profil';
export const GESTION_BARATHONS = 'Gestion des Barathons';
export const CREATE_BARATHONS = 'Créer un Barathon';
export const USER_NAME = 'Nom d\'utilisateur';
export const ACCOUNT_INFO = 'Informations du compte';
export const EMAIL = 'Email';
export const DISCONNECT = 'Se déconnecter';
export const BIRTHDATE = 'Date de naissance';
export const EDIT = 'Modifier';
export const EDIT_MDP = 'Modifier le mot de passe';
export const STATISTICS = 'Statistiques'
export const CLOSE = 'Fermer';
export const INFORMATIONS = 'Vous pouvez modifier les informations de votre compte en changeant votre nom d\'utilisateur et mot de passe';
export const KM = 'Nombre de km parcouru';
export const RESET_PWD = 'Reset your password'
export const RANDOM_EMAIL = faker.internet.email();
export const RANDOM_USERNAME = faker.lorem.words(1);
export const RANDOM_BIRTHDATE = faker.date.between(
    new Date(new Date().setFullYear(new Date().getFullYear() - 80)),
    new Date(new Date().setFullYear(new Date().getFullYear() - 18))
);

export const FORMATTED_DATE = {
    day: RANDOM_BIRTHDATE.getDate(),
    month: RANDOM_BIRTHDATE.getMonth() + 1,
    year: RANDOM_BIRTHDATE.getFullYear(),
}
export const DATE_FORMATTED = `${FORMATTED_DATE.year}-${FORMATTED_DATE.month < 10 ? '0' : ''}${FORMATTED_DATE.month}-${FORMATTED_DATE.day < 10 ? '0' : ''}${FORMATTED_DATE.day}`;

export const VALID_ACCOUNT = {
    email: 'loicbozon@gmail.com',
    password: '1234A!aa'
};

export const RANDOM_ACCOUNT = {
    email: RANDOM_EMAIL,
    username: RANDOM_USERNAME,
    birthdate: DATE_FORMATTED
};

export async function login(page: Page): Promise<void> {
    await page.goto('http://localhost:3000/auth/login');
    await page.locator('input[name="email"]').fill(VALID_ACCOUNT.email)
    await page.locator('input[name="password"]').fill(VALID_ACCOUNT.password)
    await page.locator('button').getByText(LOGIN).click()
};

export async function navProfil(page: Page): Promise<void> {
    await page.goto('http://localhost:3000/auth/login');
    await page.locator('input[name="email"]').fill(VALID_ACCOUNT.email)
    await page.locator('input[name="password"]').fill(VALID_ACCOUNT.password)
    await page.locator('button').getByText(LOGIN).click()
    await page.locator('img[alt="image profile"]').first().click()
};