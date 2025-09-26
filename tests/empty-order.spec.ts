import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Navbar } from '../pages/Navbar';
import { CartPage } from '../pages/CartPage';
import { PlaceOrderModal } from '../pages/PlaceOrderModal';

test('Cannot purchase with empty cart', async ({ page }) => {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const cart = new CartPage(page);
  const order = new PlaceOrderModal(page);

  await base.gotoHome();
  await nav.openCart();

  let attempts = 0;
  while (!(await cart.isEmpty()) && attempts < 5) {
    await cart.deleteFirstItem();
    attempts++;
  }
  const wasEmpty = await cart.isEmpty();
  await cart.openPlaceOrder();

  if (wasEmpty) {
    await order.purchase({
      name: 'Empty User', country: 'UK', city: 'London', card: '4111111111111111', month: '12', year: '2030'
    });
    await expect(page.locator('.sweet-alert')).not.toBeVisible({ timeout: 2000 });
  }
});