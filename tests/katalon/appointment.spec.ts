import { expect, test } from '@playwright/test';

test.describe('Make an Appointment', {
    tag: ["@katalon", "@appointment"],
    annotation: { type: 'application', description: 'Katalon' },
}, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
    });

    test('should be able to make an appointment', { tag: ["@appointment"] }, async ({ page }) => {
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/.*appointment/);

        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        await page.getByRole('radio', { name: 'Medicaid' }).check();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('cell', { name: '4' }).first().click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('This is a simple comment');
        await page.getByRole('button', { name: 'Book Appointment' }).click();
        await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        await expect(page.locator('#summary')).toContainText('Please be informed that your appointment has been booked as following:');
        await expect(page.locator('#facility')).toContainText('Hongkong CURA Healthcare Center');
        await expect(page.locator('#hospital_readmission')).toContainText('Yes');
        await expect(page.locator('#program')).toContainText('Medicaid');
        await expect(page.locator('#visit_date')).toContainText('04/08/2026');
        await expect(page.locator('#comment')).toContainText('This is a simple comment');
        await page.getByRole('heading', { name: 'Appointment Confirmation' }).click();
    });

    test('should not be able to make an appointment with invalid credentials', { tag: ["@login"] }, async ({ page, browserName }) => {
        if (browserName === 'webkit') {
            test.skip();
        }

        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await page.getByLabel('Username').fill('Invalid User');
        await page.getByLabel('Password').fill('Invalid Password');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Login failed! Please ensure the username and password are valid.')).toBeVisible();
    });

    test('should not be able to make an appointment with empty credentials', { tag: ["@login"] }, async ({ page, browserName }) => {
        if (browserName === 'firefox') {
            test.skip();
        }

        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Login failed! Please ensure the username and password are valid.')).toBeVisible();
    });

});
