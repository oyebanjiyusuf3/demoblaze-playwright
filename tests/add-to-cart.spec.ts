import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Navbar } from '../pages/Navbar';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Add item to cart', async ({ page }) => {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const list = new ProductListPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await base.gotoHome();
  await list.openProductByName('Samsung galaxy s6');
  await product.addToCartAcceptAlert();

  await nav.openCart();
  await cart.expectItemPresent('Samsung galaxy s6');
});