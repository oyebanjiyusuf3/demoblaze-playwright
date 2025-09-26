import { Page } from '@playwright/test';
export class Navbar {
  constructor(private page: Page) {}
  loginButton = '#login2';
  signUpButton = '#signin2';
  contactButton = 'a[data-target="#exampleModal"]';
  cartLink = '#cartur';
  async openLogin() { await this.page.click(this.loginButton); }
  async openSignUp() { await this.page.click(this.signUpButton); }
  async openContact() { await this.page.click(this.contactButton); }
  async openCart() { await this.page.click(this.cartLink); }
  async selectCategory(name: 'Phones'|'Laptops'|'Monitors') {
    await this.page.click(`.list-group a:has-text("${name}")`);
  }
  async logout() {
    await this.page.click('a#logout2');
  }
}