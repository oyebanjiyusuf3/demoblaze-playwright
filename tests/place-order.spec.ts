import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Navbar } from '../pages/Navbar';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { PlaceOrderModal } from '../pages/PlaceOrderModal';

// Helper function to set up cart with a product
async function setupCartWithProduct(page: any) {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const list = new ProductListPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await base.gotoHome();
  await list.openProductByName('Samsung galaxy s6');
  await product.addToCartAcceptAlert();
  await nav.openCart();

  return { base, nav, list, product, cart };
}

test('Should show validation error when submitting with all fields empty', async ({ page }) => {
  const { cart } = await setupCartWithProduct(page);
  const order = new PlaceOrderModal(page);

  await cart.openPlaceOrder();
  await order.expectValidationAlert('Please fill out all fields required.');
});

test('Should fail when submitting with all fields filled with invalid data', async ({ page }) => {
  const { cart } = await setupCartWithProduct(page);
  const order = new PlaceOrderModal(page);

  await cart.openPlaceOrder();
  await order.fillFields({
    name: '###', // Invalid name
    country: '123', // Invalid country  
    city: '***', // Invalid city
    card: '1234', // Invalid card number
    month: '13', // Invalid month
    year: '2020' // Past year
  });
  
  // Try to submit and expect it to fail (modal should remain open)
  await order.clickPurchase();
  await order.expectNoSuccessModal();
  await order.expectModalStillOpen();
});