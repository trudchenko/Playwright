# Playwright

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('rudchenkosumy@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password1!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();
  await page.getByRole('button', { name: 'Add car' }).click();
  await page.getByLabel('Brand').selectOption('1: 2');
  await page.getByLabel('Model').selectOption('12: 8');
  await page.getByRole('spinbutton', { name: 'Mileage' }).click();
  await page.getByRole('spinbutton', { name: 'Mileage' }).fill('125');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Add fuel expense' }).click();
  await page.getByRole('spinbutton', { name: 'Mileage' }).click();
  await page.getByRole('spinbutton', { name: 'Mileage' }).fill('128');
  await page.getByRole('spinbutton', { name: 'Number of liters' }).click();
  await page.getByRole('spinbutton', { name: 'Number of liters' }).fill('25');
  await page.getByRole('spinbutton', { name: 'Total cost' }).click();
  await page.getByRole('spinbutton', { name: 'Total cost' }).fill('50');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('heading', { name: 'Fuel expenses' })).toBeVisible();
});



test('test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  await expect(page.getByRole('link', { name: ' Garage' })).toBeVisible();
  await page.getByRole('heading', { name: 'Garage' }).click();
  await page.getByRole('button', { name: '' }).first().click();
  await page.getByRole('button', { name: 'Remove car' }).click();
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByText('Car removed')).toBeVisible();
});