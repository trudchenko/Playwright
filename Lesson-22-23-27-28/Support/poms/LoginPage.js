import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {

    selectors = {
        buttonSignIp: this.page.getByRole('button', { name: 'Sign In' }),
        buttonLogin: this.page.getByRole('button', { name: 'Login' }),
        emailField: this.page.getByRole('textbox', { name: 'Email' }),
        passwordField: this.page.getByRole('textbox', { name: 'Password' }),
        buttonAddCar: this.page.getByRole('button', { name: 'Add car' }),
        buttonEditProfile: this.page.getByRole('button', { name: 'Edit profile' }),
        buttonMyProfile: this.page.getByRole('#userNavDropdown'),
    };
   

    async executeLogin(username, pasword) {
        await this.selectors.buttonSignIp.click();
        await this.selectors.emailField.fill(username);
        await this.selectors.passwordField.fill(pasword);
        await this.selectors.buttonLogin.click();
    };
    async openPage(){
        await this.page.goto('/panel/profile');
      }
};
