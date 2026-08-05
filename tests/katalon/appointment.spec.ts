import { expect, test } from '../../src/fixtures/test-base';

test.describe('Make an Appointment', {
    tag: ["@katalon", "@appointment"],
    annotation: { type: 'application', description: 'Katalon' },
}, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
    });

    test('should be able to make an appointment', { tag: ["@appointment"] }, async ({ loginPage, appointmentPage, page }) => {
        await loginPage.navigateToAppointmentPage();
        await loginPage.login('John Doe', 'ThisIsNotAPassword');
        await expect(page).toHaveURL(/.*appointment/);

        await appointmentPage.bookAppointment({
            facility: 'Hongkong CURA Healthcare Center',
            readmission: true,
            program: 'Medicaid',
            day: '4',
            comment: 'This is a simple comment'
        });

        await appointmentPage.verifyAppointmentConfirmation({
            facility: 'Hongkong CURA Healthcare Center',
            readmission: 'Yes',
            program: 'Medicaid',
            date: '04/08/2026',
            comment: 'This is a simple comment'
        });

        await appointmentPage.clickConfirmationHeading();
    });

    test('should not be able to make an appointment with invalid credentials', { tag: ["@login"] }, async ({ loginPage, browserName }) => {
        if (browserName === 'webkit') {
            test.skip();
        }

        await loginPage.navigateToAppointmentPage();
        await loginPage.login('Invalid User', 'Invalid Password');
        await loginPage.expectErrorMessageVisible();
    });

    test('should not be able to make an appointment with empty credentials', { tag: ["@login"] }, async ({ loginPage, browserName }) => {
        if (browserName === 'firefox') {
            test.skip();
        }

        await loginPage.navigateToAppointmentPage();
        await loginPage.login('', '');
        await loginPage.expectErrorMessageVisible();
    });

});
