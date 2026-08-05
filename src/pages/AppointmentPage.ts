import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class AppointmentPage extends BasePage {
  private readonly facilitySelect = this.page.getByLabel('Facility');
  private readonly readmissionCheckbox = this.page.getByRole('checkbox', { name: 'Apply for hospital readmission' });
  private readonly medicaidRadio = this.page.getByRole('radio', { name: 'Medicaid' });
  private readonly dateInput = this.page.getByRole('textbox', { name: 'Visit Date (Required)' });
  private readonly commentInput = this.page.getByRole('textbox', { name: 'Comment' });
  private readonly bookButton = this.page.getByRole('button', { name: 'Book Appointment' });
  
  private readonly confirmationHeading = this.page.locator('h2');
  private readonly summaryText = this.page.locator('#summary');
  private readonly facilityText = this.page.locator('#facility');
  private readonly readmissionText = this.page.locator('#hospital_readmission');
  private readonly programText = this.page.locator('#program');
  private readonly dateText = this.page.locator('#visit_date');
  private readonly commentText = this.page.locator('#comment');

  async bookAppointment(details: {
    facility: string,
    readmission: boolean,
    program: string,
    day: string,
    comment: string
  }) {
    await this.facilitySelect.selectOption(details.facility);
    if (details.readmission) await this.readmissionCheckbox.check();
    await this.medicaidRadio.check();
    await this.dateInput.click();
    await this.page.getByRole('cell', { name: details.day }).first().click();
    await this.commentInput.fill(details.comment);
    await this.bookButton.click();
  }

  async verifyAppointmentConfirmation(details: {
    facility: string,
    readmission: string,
    program: string,
    date: string,
    comment: string
  }) {
    await expect(this.confirmationHeading).toContainText('Appointment Confirmation');
    await expect(this.summaryText).toContainText('Please be informed that your appointment has been booked as following:');
    await expect(this.facilityText).toContainText(details.facility);
    await expect(this.readmissionText).toContainText(details.readmission);
    await expect(this.programText).toContainText(details.program);
    await expect(this.dateText).toContainText(details.date);
    await expect(this.commentText).toContainText(details.comment);
  }

  async clickConfirmationHeading() {
    await this.page.getByRole('heading', { name: 'Appointment Confirmation' }).click();
  }
}
