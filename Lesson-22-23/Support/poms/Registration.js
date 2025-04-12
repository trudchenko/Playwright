import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class Registration extends BasePage {

    selectors = {
    
        buttonSignUp: this.page.getByRole('button', { name: 'Sign up' }),
        
        registrationNameField: this.page.locator('#signupName'),
        registrationLastNameField: this.page.locator('#signupLastName'),
        registrationEmailField: this.page.locator('#signupEmail'),
        registrationPasswordField: this.page.locator('#signupPassword'),
        registrationRepeatPasswordField:this.page.locator('#signupRepeatPassword'),
        clickOutsideTheField: this.page.getByText('Name', { exact: true }),
        
        nameErrorMessage1: this.page.getByText('Name required'),
        nameErrorMessage2: this.page.getByText('Name is invalid'),
        nameErrorMessage3: this.page.getByText('Name has to be from 2 to 20 characters long'),
        lastNameErrorMessage1: this.page.getByText('Last name required'),
        lastNameErrorMessage2: this.page.getByText('Last name is invalid'),
        lastNameErrorMessage3: this.page.getByText('Last name has to be from 2 to 20 characters long'),
        emailErrorMessage1: this.page.getByText('Email required'),
        emailErrorMessage2: this.page.getByText('Email is incorrect'),
        passwordErrorMessage1: this.page.getByText('Password required'),
        passwordErrorMessage2: this.page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'),
        repeatpasswordErrorMessage1: this.page.getByText('Re-enter password required'),
        repeatpasswordErrorMessage2: this.page.getByText('Passwords do not match'),

        buttonRegister: this.page.getByRole('button', { name: 'Register' }),
      
        myProfileButton:this.page.locator('button#userNavDropdown')
    };

    async fillAllFields(name, lastName, email, password, repeatPassword) {
        if (!!name) {
            await this.selectors.registrationNameField.fill(name);
        }
        if (!!lastName) {
            await this.selectors.registrationLastNameField.fill(lastName);
        }
        if (!!email) {
            await this.selectors.registrationEmailField.fill(email);
        }
        if (!!password) {
            await this.selectors.registrationPasswordField.fill(password);
        }
        if (!!repeatPassword) {
            await this.selectors.registrationRepeatPasswordField.fill(repeatPassword);
        }
    }

    async fillName(name) {
        await this.selectors.registrationNameField.click(); 
        if (!!name) {
            this.selectors.registrationNameField.fill(name); 
        }
        await this.selectors.clickOutsideTheField.click();

    }

    async  testName(firstName) {
        await this.fillName(firstName);
        if (!!firstName) {
            await expect(this.selectors.nameErrorMessage2).toBeVisible();
            await expect(this.selectors.nameErrorMessage3).toBeVisible();
        } else await expect(this.selectors.nameErrorMessage1).toBeVisible();
        
        await expect(this.selectors.registrationNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.selectors.buttonRegister).toHaveJSProperty('disabled', true);
         
    }

    async fillLastName(name) {
        await this.selectors.registrationLastNameField.click(); 
        if (!!name) {
            this.selectors.registrationLastNameField.fill(name); 
        }
        await this.selectors.clickOutsideTheField.click();

    }

    async  testLastName(lastName) {
        await this.fillLastName(lastName);
        if (!!lastName) {
            await expect(this.selectors.lastNameErrorMessage2).toBeVisible();
            await expect(this.selectors.lastNameErrorMessage3).toBeVisible();
        } else {
            await expect(this.selectors.lastNameErrorMessage1).toBeVisible();
        }
        await expect(this.selectors.registrationLastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.selectors.buttonRegister).toHaveJSProperty('disabled', true);
         
    }

    async fillEmail(email) {
        await this.selectors.registrationEmailField.click(); 
        if (!!email) {
            this.selectors.registrationEmailField.fill(email); 
        }
        await this.selectors.clickOutsideTheField.click();

    }

    async  testEmail(email) {
        await this.fillEmail(email);
        if (!!email) {
            await expect(this.selectors.emailErrorMessage2).toBeVisible();
        } else {
            await expect(this.selectors.emailErrorMessage1).toBeVisible();
        }
        await expect(this.selectors.registrationEmailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.selectors.buttonRegister).toHaveJSProperty('disabled', true);
    }

    async fillPassword(password) {
        await this.selectors.registrationPasswordField.click(); 
        if (!!password) {
            this.selectors.registrationPasswordField.fill(password); 
        }
        await this.selectors.clickOutsideTheField.click();
    }

    async  testPassword(password) {
        await this.fillPassword(password);
        if (!!password) {
            await expect(this.selectors.passwordErrorMessage2).toBeVisible();
        } else {
            await expect(this.selectors.passwordErrorMessage1).toBeVisible();
        }
        await expect(this.selectors.registrationPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.selectors.buttonRegister).toHaveJSProperty('disabled', true);     
    }

    async fillRepeatPassword(password) {
        await this.selectors.registrationRepeatPasswordField.click(); 
        if (!!password) {
            this.selectors.registrationRepeatPasswordField.fill(password); 
        }
        await this.selectors.clickOutsideTheField.click();
    }

    async  testRepeatPassword(password, repeatPassword) {
        await this.fillPassword(password);
        await this.fillRepeatPassword(repeatPassword);
        if (!!repeatPassword) {
            await expect(this.selectors.repeatpasswordErrorMessage2).toBeVisible();
        } else {
            await expect(this.selectors.repeatpasswordErrorMessage1).toBeVisible();
        }
        await expect(this.selectors.registrationRepeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.selectors.buttonRegister).toHaveJSProperty('disabled', true);     
    }
}