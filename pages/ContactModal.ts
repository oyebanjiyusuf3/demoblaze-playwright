import { Page, expect } from '@playwright/test';
export class ContactModal {
  constructor(private page: Page) {}
  modal = '#exampleModal';
  contactEmail = '#recipient-email';
  contactName = '#recipient-name';
  message = '#message-text';
  sendButton = 'button:has-text("Send message")';
  async sendMessage(email: string, name: string, msg: string) {
    await expect(this.page.locator(this.modal)).toBeVisible();
    await this.page.fill(this.contactEmail, email);
    await this.page.fill(this.contactName, name);
    await this.page.fill(this.message, msg);
    const dialog = this.page.waitForEvent('dialog');
    await this.page.click(this.sendButton);
    const alert = await dialog;
    await alert.accept();
  }
  async expectCannotSendWithEmptyFields() {
    await this.page.click('#contact2'); // Open modal if not already open
    // Clear all fields
    await this.page.fill('#recipient-email', '');
    await this.page.fill('#recipient-name', '');
    await this.page.fill('#message-text', '');
    // Try to click send and check for error or modal still open
    await this.page.click('button:has-text("Send message")');
    // Wait for a short time to see if modal closes
    await this.page.waitForTimeout(500);
    // Modal should still be visible
    await this.page.waitForSelector('#exampleModal', { state: 'visible' });
  }
}