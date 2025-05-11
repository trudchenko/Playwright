import { test as base, expect } from '@playwright/test';
// import { LoginPage } from '../Support/poms';
import { Garage } from '../Support/poms';

export const test = base.extend({
    garage: async({ page }, use) => {
     
        //befor test 
            // const loginpage = new LoginPage(page);
            const garage = new Garage(page);

            // await page.goto(baseURL);
            // await loginpage.executeLogin(httpCredentials.username, httpCredentials.password);

            await garage.openPage();
            await garage.addCar('Audi', 'TT', '12');
           

             //for test
            await use(garage);

            //after test
            await garage.removeCar();
    }
});
export { expect } from '@playwright/test';

