import { Page, expect } from '@playwright/test';
export class PlaceOrderModal {
  constructor(private page: Page) {}
  modal = '#orderModal';
  name = '#name';
  country = '#country';
  city = '#city';
  card = '#card';
  month = '#month';
  year = '#year';
  purchaseBtn = 'button:has-text("Purchase")';
  successModal = '.sweet-alert';
  okBtn = 'button:has-text("OK")';
  async purchase(d: {name:string,country:string,city:string,card:string,month:string,year:string}) {
    await expect(this.page.locator(this.modal)).toBeVisible();
    await this.page.fill(this.name, d.name);
    await this.page.fill(this.country, d.country);
    await this.page.fill(this.city, d.city);
    await this.page.fill(this.card, d.card);
    await this.page.fill(this.month, d.month);
    await this.page.fill(this.year, d.year);
    await this.page.click(this.purchaseBtn);
  }
  async expectSuccess() {
    await expect(this.page.locator(this.successModal)).toContainText('Thank you for your purchase!');
    await this.page.click(this.okBtn);
  }

  async fillFields(data: Partial<{name:string,country:string,city:string,card:string,month:string,year:string}>) {
    await expect(this.page.locator(this.modal)).toBeVisible();
    
    if (data.name !== undefined) await this.page.fill(this.name, data.name);
    if (data.country !== undefined) await this.page.fill(this.country, data.country);
    if (data.city !== undefined) await this.page.fill(this.city, data.city);
    if (data.card !== undefined) await this.page.fill(this.card, data.card);
    if (data.month !== undefined) await this.page.fill(this.month, data.month);
    if (data.year !== undefined) await this.page.fill(this.year, data.year);
  }

  async clickPurchase() {
    await this.page.click(this.purchaseBtn);
  }

  async expectValidationAlert(message: string) {
    // Wait for alert dialog and verify message
    const alertPromise = this.page.waitForEvent('dialog');
    await this.clickPurchase();
    const dialog = await alertPromise;
    expect(dialog.message()).toBe(message);
    await dialog.accept();
  }

  async expectNoSuccessModal() {
    // Ensure success modal doesn't appear
    await expect(this.page.locator(this.successModal)).not.toBeVisible({ timeout: 3000 });
  }

  async expectModalStillOpen() {
    // Verify the order modal is still visible
    await expect(this.page.locator(this.modal)).toBeVisible();
  }
}