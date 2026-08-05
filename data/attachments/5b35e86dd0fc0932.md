# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: katalon/appointment.spec.ts >> Make an Appointment >> should be able to make an appointment
- Location: tests/katalon/appointment.spec.ts:14:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#visit_date')
Expected substring: "08/04/2026"
Received string:    "04/08/2026"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#visit_date')
    14 × locator resolved to <p id="visit_date">04/08/2026</p>
       - unexpected value "04/08/2026"

```

```yaml
- paragraph: 04/08/2026
```

# Test source

```ts
  1  | import { BasePage } from './BasePage';
  2  | import { expect } from '@playwright/test';
  3  | 
  4  | export class AppointmentPage extends BasePage {
  5  |   private readonly facilitySelect = this.page.getByLabel('Facility');
  6  |   private readonly readmissionCheckbox = this.page.getByRole('checkbox', { name: 'Apply for hospital readmission' });
  7  |   private readonly medicaidRadio = this.page.getByRole('radio', { name: 'Medicaid' });
  8  |   private readonly dateInput = this.page.getByRole('textbox', { name: 'Visit Date (Required)' });
  9  |   private readonly commentInput = this.page.getByRole('textbox', { name: 'Comment' });
  10 |   private readonly bookButton = this.page.getByRole('button', { name: 'Book Appointment' });
  11 |   
  12 |   private readonly confirmationHeading = this.page.locator('h2');
  13 |   private readonly summaryText = this.page.locator('#summary');
  14 |   private readonly facilityText = this.page.locator('#facility');
  15 |   private readonly readmissionText = this.page.locator('#hospital_readmission');
  16 |   private readonly programText = this.page.locator('#program');
  17 |   private readonly dateText = this.page.locator('#visit_date');
  18 |   private readonly commentText = this.page.locator('#comment');
  19 | 
  20 |   async bookAppointment(details: {
  21 |     facility: string,
  22 |     readmission: boolean,
  23 |     program: string,
  24 |     day: string,
  25 |     comment: string
  26 |   }) {
  27 |     await this.facilitySelect.selectOption(details.facility);
  28 |     if (details.readmission) await this.readmissionCheckbox.check();
  29 |     await this.medicaidRadio.check();
  30 |     await this.dateInput.click();
  31 |     await this.page.getByRole('cell', { name: details.day }).first().click();
  32 |     await this.commentInput.fill(details.comment);
  33 |     await this.bookButton.click();
  34 |   }
  35 | 
  36 |   async verifyAppointmentConfirmation(details: {
  37 |     facility: string,
  38 |     readmission: string,
  39 |     program: string,
  40 |     date: string,
  41 |     comment: string
  42 |   }) {
  43 |     await expect(this.confirmationHeading).toContainText('Appointment Confirmation');
  44 |     await expect(this.summaryText).toContainText('Please be informed that your appointment has been booked as following:');
  45 |     await expect(this.facilityText).toContainText(details.facility);
  46 |     await expect(this.readmissionText).toContainText(details.readmission);
  47 |     await expect(this.programText).toContainText(details.program);
> 48 |     await expect(this.dateText).toContainText(details.date);
     |                                 ^ Error: expect(locator).toContainText(expected) failed
  49 |     await expect(this.commentText).toContainText(details.comment);
  50 |   }
  51 | 
  52 |   async clickConfirmationHeading() {
  53 |     await this.page.getByRole('heading', { name: 'Appointment Confirmation' }).click();
  54 |   }
  55 | }
  56 | 
```