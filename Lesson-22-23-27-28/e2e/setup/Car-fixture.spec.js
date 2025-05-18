
import { test, expect } from '../../fixture/userGaragePage.fixture';
import { Expenses } from '../../Support/poms';

let expenses;

test.describe('FIXTURE_BASED: Garage test', () => {
    
    test('FIXTURE_BASED: Add Card', async ({garage}) => {
        await expect(garage.selectors.carAddedLabel).toBeVisible();
        await expect(garage.selectors.carExist).toBeVisible();
    });

    test ('Add Fuel Expenses', async ({page, garage}) => {
        expenses = new Expenses(page);
        await expenses.addFuelExpenses('128', '20', '40');
        await expect(expenses.selectors.fuelExpensesTab).toContainClass('-active');
        await expect(expenses.selectors.expenseCells.nth(1)).toContainText('128');
        await expect(expenses.selectors.expenseCells.nth(2)).toContainText('20L');

        await expect(expenses.selectors.expenseCells.nth(3)).toContainText(process.env.BASE_ENV === "prod" ? '40 USD' : '40.00 USD');
    });    
})