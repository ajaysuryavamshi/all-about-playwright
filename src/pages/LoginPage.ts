import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  private readonly makeAppointmentLink = this.page.getByRole('link', { name: 'Make Appointment' });
  private readonly usernameInput = this.page.getByLabel('Username');
  private readonly passwordInput = this.page.getByLabel('Password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly errorMessage = this.page.getByText('Login failed! Please ensure the username and password are valid.');

  async navigateToAppointmentPage() {
    await this.makeAppointmentLink.click();
  }

  async login(username: string, password?: string) {
    if (username) await this.usernameInput.fill(username);
    if (password) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorMessageVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}
