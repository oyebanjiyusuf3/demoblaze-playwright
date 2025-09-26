import { Page, expect } from '@playwright/test';
export class SignUpModal {
  constructor(private page: Page) {}
  modal = '#signInModal';
  username = '#sign-username';
  password = '#sign-password';
  submit = 'button:has-text("Sign up")';
  async signUp(user: string, pass: string) {
    await expect(this.page.locator(this.modal)).toBeVisible();
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    const dialog = this.page.waitForEvent('dialog');
    await this.page.click(this.submit);
    const alert = await dialog;
    await alert.accept();
  }
}