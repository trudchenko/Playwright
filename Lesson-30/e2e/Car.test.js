import { test, expect } from '@playwright/test';
import { LoginPage } from '../Support/poms';
import { Garage } from '../Support/poms';
import { Expenses } from '../Support/poms';

/** @type {LoginPage} */
let loginpage;
let garage;
let expenses;

test.describe('Garage test', () => {
    test.beforeEach(async({ page, baseURL}) => {
        loginpage = new LoginPage(page);
        garage = new Garage(page);
        expenses = new Expenses(page);
        
        await page.goto(baseURL);
        await loginpage.executeLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
        
    });

    test.afterEach ('Remove Card', async () => {
        await garage.removeCar();
    });

    test('Add Card', async ({page}) => {
        await garage.addCar('Audi', 'TT', '12');
                
        await expect(garage.selectors.carAddedLabel).toBeVisible();
        await expect(garage.selectors.carExist).toBeVisible();
    });

    test.skip ('Add Fuel Expenses', async ({page}) => {
        await garage.addCar('Ford', 'Focus', '99');
        await expenses.addFuelExpenses('128', '20', '40');
        await expect(expenses.selectors.fuelExpensesTab).toContainClass('-active');
        await expect(expenses.selectors.expenseCells.nth(1)).toContainText('128');
        await expect(expenses.selectors.expenseCells.nth(2)).toContainText('20L');

        if (process.env.BASE_ENV === "prod") {
            await expect(expenses.selectors.expenseCells.nth(3)).toContainText('40 USD');
            
        } else {
            await expect(expenses.selectors.expenseCells.nth(3)).toContainText('40.00 USD');
        }
       
    });
})