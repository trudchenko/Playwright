import { test, expect } from '@playwright/test';
import { LoginPage } from '../Support/poms';
import { Garage } from '../Support/poms';
import { Expenses } from '../Support/poms';

/** @type {LoginPage} */
let loginpage;
let garage;
let expenses;

test.describe('Garage test', () => {
    test.beforeEach(async({ page }) => {
        loginpage = new LoginPage(page);
        garage = new Garage(page);
        expenses = new Expenses(page);
        
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await loginpage.executeLogin('rudchenkosumy@gmail.com', 'Password1!');
    });

    test.afterEach ('Remove Card', async () => {
        await garage.removeCar();
    });

    test('Add Card', async () => {
        await garage.addCar('Audi', 'TT', '12');
        await expect(garage.selectors.carAddedLabel).toBeVisible();
        await expect(garage.selectors.carExist).toBeVisible();
    });

    test ('Add Fuel Expenses', async ({page}) => {
        await garage.addCar('Ford', 'Focus', '99');
        await expenses.addFuelExpenses('128', '20', '40');
        await expect(expenses.selectors.fuelExpensesTab).toContainClass('-active');
        await expect(expenses.selectors.expenseCells.nth(1)).toContainText('128');
        await expect(expenses.selectors.expenseCells.nth(2)).toContainText('20L');
        await expect(expenses.selectors.expenseCells.nth(3)).toContainText('40.00 USD');
    });
})