import { expect, test } from '../../src/fixtures/test-base';
import appointmentData from '../../src/data/appointment-data.json';

test.describe('Make an Appointment', {
    tag: ["@katalon", "@appointment"],
    annotation: { type: 'application', description: 'Katalon' },
}, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should be able to make an appointment', { tag: ["@appointment"] }, async ({ loginPage, appointmentPage, page }) => {
        await loginPage.navigateToAppointmentPage();
        await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
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

    for (const data of appointmentData) {
        test(data.description, { tag: ["@login"] }, async ({ loginPage, browserName }) => {
            if (data.username === 'Invalid User' && browserName === 'webkit') {
                test.skip();
            }
            if (data.username === '' && browserName === 'firefox') {
                test.skip();
            }

            await loginPage.navigateToAppointmentPage();
            await loginPage.login(data.username, data.password);
            await loginPage.expectErrorMessageVisible();
        });
    }

});
