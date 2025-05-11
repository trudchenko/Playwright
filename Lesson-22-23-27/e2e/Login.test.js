
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Support/poms';

/** @type {LoginPage} */
let loginpage;

test.describe('Login test', () => {
    test.beforeEach(async({ page, baseURL}) => {
        loginpage = new LoginPage(page);
        
        // await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.goto(baseURL);

            });

     test('Login', async ({httpCredentials}) => {
           await loginpage.executeLogin(httpCredentials.username, httpCredentials.password);
           await expect(loginpage.selectors.buttonAddCar).toBeVisible();
    });
})
