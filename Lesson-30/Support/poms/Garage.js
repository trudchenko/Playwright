import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class Garage extends BasePage {

    selectors = {
        buttonAddCar: this.page.getByRole('button', { name: 'Add car' }),
        selectBrand: this.page.getByLabel('Brand'),
        selectModel: this.page.getByLabel('Model'),
        inputMileage: this.page.getByRole('spinbutton', { name: 'Mileage' }),
        buttonAdd: this.page.getByRole('button', { name: 'Add' }),
        buttonEdit: this.page.locator('button.car_edit'),
        buttonRemoveCar: this.page.getByRole('button', { name: 'Remove car' }),
        buttonRemove: this.page.getByRole('button', { name: 'Remove' }),
        carExist: this.page.locator('li.car-item').first(),
        garageTab: this.page.getByRole('link', { name: ' Garage' }),
        carAddedLabel: this.page.getByText('Car added')          
     };

    async addCar(brandId, model, mileage) {
        await this.selectors.buttonAddCar.click();
        await this.selectors.selectBrand.selectOption(brandId);
        await this.selectors.selectModel.selectOption(model);
        await this.selectors.inputMileage.fill(mileage);
        await this.selectors.buttonAdd.click();
    };

    async removeCar() {
        await this.selectors.garageTab.click();
        const count = await this.selectors.buttonEdit.count();
        if (count < 1) {
            return;
        }

        await this.selectors.buttonEdit.first().click();
        await this.selectors.buttonRemoveCar.click();
        await this.selectors.buttonRemove.click();
    };   
    
    async openPage(){
        await this.page.goto('/panel/garage');
      }
}
