import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Support/poms';

/** @type {LoginPage} */
let loginpage;

const authFile = 'session-storage.json';

setup('SETUP_BASED: Login',
     async({page, baseURL}) => {
        loginpage = new LoginPage(page);
        
        await page.goto(baseURL);

        await loginpage.executeLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
        await loginpage.page.waitForTimeout(1000);

        await page.context().storageState({ path: authFile });
           
    })