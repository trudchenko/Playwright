import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://qauto.forstudy.space/');
    await page.getByRole('button', { name: 'Sign up' }).click();
});


test.describe('Registration page test', () => {

    test('Test Name Field', async ({ page }) => {
      
        await page.locator('#signupName').click();
        await page.getByText('Name', { exact: true }).click();
        await expect(page.getByText('Name required')).toBeVisible();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);

        await page.locator('#signupName').fill(' ');
        await page.getByText('Name', { exact: true }).click();
        await expect(page.getByText('Name is invalid')).toBeVisible();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);

        await page.locator('#signupName').fill('TheodosianaFerdinandetta');
        await page.getByText('Name', { exact: true }).click();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);
    });

    test('Test Last Name Field', async ({ page }) => {
    
        await page.locator('#signupLastName').click();
        await page.getByText('Name', { exact: true }).click();
        await expect(page.getByText('Last name required')).toBeVisible();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);

        await page.locator('#signupLastName').fill(' ');
        await page.getByText('Name', { exact: true }).click();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);

        await page.locator('#signupLastName').fill('TheodosianaFerdinandetta');
        await page.getByText('Name', { exact: true }).click();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);
    });

  test ('Test Email Field', async ({ page }) => {
   
   await page.locator('#signupEmail').click();
   await page.getByText('Name', { exact: true }).click();
   await expect(page.getByText('Email required')).toBeVisible();
   await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);

   await page.locator('#signupEmail').fill('Myemal');
   await page.getByText('Name', { exact: true }).click(); 
   await expect(page.getByText('Email is incorrect')).toBeVisible();
   await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);
  });

  test('Test Password Field', async ({ page }) => {
   
    await page.locator('#signupPassword').click();
    await page.getByText('Name', { exact: true }).click();
    await expect(page.getByText('Password required')).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);

    await page.locator('#signupPassword').fill('Th1');
    await page.getByText('Name', { exact: true }).click();
    await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);  
    
    await page.locator('#signupPassword').fill('Theodosiana');
    await page.getByText('Name', { exact: true }).click();
    await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true); 

    await page.locator('#signupPassword').fill('theodosiana1');
    await page.getByText('Name', { exact: true }).click();
    await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);
    
    await page.locator('#signupPassword').fill('PASSWORD1');
    await page.getByText('Name', { exact: true }).click();
    await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
    await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect (page.getByRole('button', { name: 'Register' })).toHaveJSProperty('disabled', true);
  });



})