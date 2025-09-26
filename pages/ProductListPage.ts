import { Page, expect } from '@playwright/test';
export class ProductListPage {
  constructor(private page: Page) {}
  productCardTitle = '.card-title';
  async openProductByName(name: string) {
    await this.page.click(`.card-title:has-text("${name}")`);
  }
  async expectAnyProductsVisible() {
    // Use the correct selector for Demoblaze product cards
    const productSelector = '.col-lg-4.col-md-6.mb-4';
    await this.page.waitForSelector(productSelector, { state: 'visible', timeout: 5000 });
    const count = await this.page.locator(productSelector).count();
    expect(count).toBeGreaterThan(0);
  }
}