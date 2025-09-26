import { Page } from '@playwright/test';
export class BasePage {
  constructor(public page: Page) {}
  async gotoHome() { await this.page.goto('https://www.demoblaze.com/index.html'); }
}