import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Support/poms';

/** @type {LoginPage} */
let loginpage;

const authFile = 'session-storage.json';

setup('SETUP_BASED: Login',
     async({ page, baseURL, httpCredentials}) => {
        loginpage = new LoginPage(page);
        
        // await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.goto(baseURL);

        await loginpage.executeLogin(httpCredentials.username, httpCredentials.password);
        await loginpage.page.waitForTimeout(1000);

        await page.context().storageState({ path: authFile });
           
    })