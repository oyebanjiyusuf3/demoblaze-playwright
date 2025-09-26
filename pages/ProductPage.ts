import { Page } from '@playwright/test';
export class ProductPage {
  constructor(private page: Page) {}
  addToCartLink = 'a:has-text("Add to cart")';
  async addToCartAcceptAlert() {
    const dialog = this.page.waitForEvent('dialog');
    await this.page.click(this.addToCartLink);
    const alert = await dialog;
    await alert.accept();
  }
}