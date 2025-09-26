import { Page, expect } from '@playwright/test';
export class CartPage {
  constructor(private page: Page) {}
  tableRows = '#tbodyid tr';
  deleteLinks = 'a:text("Delete")';
  placeOrderBtn = 'button:has-text("Place Order")';
  totalLabel = '#totalm';
  async isEmpty(): Promise<boolean> {
    const count = await this.page.locator(this.tableRows).count();
    return count === 0;
  }
  async expectItemPresent(name: string) {
    await expect(this.page.locator(`#tbodyid td:has-text("${name}")`)).toBeVisible();
  }
  async deleteFirstItem() {
    const first = this.page.locator(this.deleteLinks).first();
    await first.click();
    await this.page.waitForTimeout(800);
  }
  async openPlaceOrder() { await this.page.click(this.placeOrderBtn); }
  async getTotal(): Promise<number> {
    const txt = await this.page.locator(this.totalLabel).textContent();
    const n = Number(txt || 0);
    return isNaN(n) ? 0 : n;
  }
}