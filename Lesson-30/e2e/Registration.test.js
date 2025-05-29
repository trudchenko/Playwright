import { test, expect } from '@playwright/test';
import { Registration } from '../Support/poms';

/** @type {Registration} */
let registration;

test.describe('Registration page tests', () => {
    test.beforeEach(async({ page, baseURL }) => {
        registration = new Registration(page);
        await page.goto(baseURL);
        await registration.selectors.buttonSignUp.click();
    });

    test('Test Name Field', async () => {
        await registration.testName('');
        await registration.testName(' ');
        await registration.testName('Theodosiana-Ferdinandetta');
    });

    test('Test Last Name Field', async () => {
        await registration.testLastName('');
        await registration.testLastName(' ');
        await registration.testLastName('Theodosiana-Ferdinandetta');
    });

    test('Test Email Field', async () => {
        await registration.testEmail('');
        await registration.testEmail('Myemail');
    });

    test('Test Pasword Field',async () => {
        await registration.testPassword('');
        await registration.testPassword('Th1');
        await registration.testPassword('Theodosiana-Ferdinandetta');
        await registration.testPassword('theodosiana1');
        await registration.testPassword('PASSWORD1');
    });

    test('Test Repeat Pasword Field',async () => {

        await registration.testRepeatPassword('', '');
        await registration.testRepeatPassword('Theodosiana1', 'Theodosiana2');

    });

    test('Test All Fields Empty', async () => {
        await expect(registration.selectors.buttonRegister).toHaveJSProperty('disabled', true);
    }); 

    test('Test Name Filed is Required', async () => {
        await registration.fillAllFields('','Rudchenko','rudchenkosumy+1@gmail.com','Theodosiana1','Theodosiana1');
        await expect(registration.selectors.buttonRegister).toHaveJSProperty('disabled', true);
    });

    test('Test Last Name Field is Required', async () => {
        await registration.fillAllFields('Tetiana','','rudchenkosumy+1@gmail.com','Theodosiana1','Theodosiana1');
        await expect(registration.selectors.buttonRegister).toHaveJSProperty('disabled', true);
    });

    test('Test Email Field is Required', async () => {
        await registration.fillAllFields('Tetiana','Rudchenko','','Theodosiana1','Theodosiana1');
        await expect(registration.selectors.buttonRegister).toHaveJSProperty('disabled', true);
    });

    test('Test Password Field is Required', async () => {
        await registration.fillAllFields('Tetiana','Rudchenko','rudchenkosumy+1@gmail.com','','Theodosiana1');
        await expect(registration.selectors.buttonRegister).toHaveJSProperty('disabled', true);
    });

    test('Test Repeat Password Field is Required', async () => {
        await registration.fillAllFields('Tetiana','Rudchenko','rudchenkosumy+1@gmail.com','Theodosiana1','');
        await expect(registration.selectors.buttonRegister).toHaveJSProperty('disabled', true);
    });

    test('Test Successfull Registration',  async ({page}) => {
        const email = 'rudchenkosumy+' + Math.floor(Math.random() * 1000) + '@gmail.com';
        console.log(email);
        await registration.fillAllFields('Tetiana', 'Rudchenko', email, 'Theodosiana1!', 'Theodosiana1!');
        await registration.selectors.buttonRegister.click();
        await expect(registration.selectors.myProfileButton).toBeVisible();
    });
})