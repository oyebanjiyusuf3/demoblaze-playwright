import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Navbar } from '../pages/Navbar';
import { ProductListPage } from '../pages/ProductListPage';

test('Browse Phones category shows products', async ({ page }) => {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const list = new ProductListPage(page);

  await base.gotoHome();
  await nav.selectCategory('Phones');
  await list.expectAnyProductsVisible();
});

test('Browse Laptops category shows products', async ({ page }) => {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const list = new ProductListPage(page);

  await base.gotoHome();
  await nav.selectCategory('Laptops');
  await list.expectAnyProductsVisible();
});

test('Browse Monitors category shows products', async ({ page }) => {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const list = new ProductListPage(page);

  await base.gotoHome();
  await nav.selectCategory('Monitors');
  await list.expectAnyProductsVisible();
});