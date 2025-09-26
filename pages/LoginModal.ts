import { Page, expect } from '@playwright/test';
export class LoginModal {
  constructor(private page: Page) {}
  modal = '#logInModal';
  username = '#loginusername';
  password = '#loginpassword';
  submit = 'button:has-text("Log in")';
  welcome = '#nameofuser';
  async login(user: string, pass: string) {
    await expect(this.page.locator(this.modal)).toBeVisible();
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.submit);
    await expect(this.page.locator(this.welcome)).toContainText(`Welcome ${user}`);
  }
}