import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class Expenses extends BasePage {

    selectors = {
        buttoAddAddFuelExpenses: this.page.getByRole('button', { name: 'Add fuel expense' }).first(),
        inputNewMileage: this.page.getByRole('spinbutton', { name: 'Mileage' }),
        inputExpenses: this.page.getByRole('spinbutton', { name: 'Number of liters' }),
        inputTotalCost: this.page.getByRole('spinbutton', { name: 'Total cost' }),
        buttonAdd: this.page.getByRole('button', { name: 'Add' }),
        // fuelExpensesTab: this.page.locator('a').filter({has : this.page.locator('span.icon-fuel')}),
        // fuelExpensesTab: this.page.locator('span.icon-fuel').locator('..'),
        fuelExpensesTab: this.page.getByTestId('expenses'),
        expenseCells: this.page.locator('tbody').locator('td')        
    }

    async addFuelExpenses(newMileage, liters, totalCost) {
        await this.selectors.buttoAddAddFuelExpenses.click();
        await this.selectors.inputNewMileage.fill('');
        await this.selectors.inputNewMileage.fill(newMileage);
        await this.selectors.inputExpenses.fill(liters);
        await this.selectors.inputTotalCost.fill(totalCost);
        await this.selectors.buttonAdd.click();
    };
}