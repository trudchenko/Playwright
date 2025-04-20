
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Support/poms';

/** @type {LoginPage} */
let loginpage;

test.describe('Login test', () => {
    test.beforeEach(async({ page }) => {
        loginpage = new LoginPage(page);
        
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    });

     test('Login', async () => {
           await loginpage.executeLogin('rudchenkosumy@gmail.com', 'Password1!');
           await expect(loginpage.selectors.buttonAddCar).toBeVisible();
    });
})
