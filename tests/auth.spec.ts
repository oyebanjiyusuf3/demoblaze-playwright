import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Navbar } from '../pages/Navbar';
import { SignUpModal } from '../pages/SignUpModal';
import { LoginModal } from '../pages/LoginModal';
import { uniqueUser, getTestCredentials } from './helpers';

test('Sign up then log in', async ({ page }) => {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const signup = new SignUpModal(page);
  const login = new LoginModal(page);

  await base.gotoHome();
  const { username, password } = getTestCredentials();

  await nav.openSignUp();
  await signup.signUp(username, password);

  await nav.openLogin();
  await login.login(username, password);
});

test('Log out after logging in', async ({ page }) => {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const signup = new SignUpModal(page);
  const login = new LoginModal(page);

  await base.gotoHome();
  const { username, password } = getTestCredentials();

  // Sign up and log in
  await nav.openSignUp();
  await signup.signUp(username, password);
  await nav.openLogin();
  await login.login(username, password);

  // Log out
  await nav.logout();

  // Assert that "Log in" button is visible again (user is logged out)
  await expect(page.locator('a#login2')).toBeVisible();
  // Optionally, assert that "Log out" button is not visible
  await expect(page.locator('a#logout2')).toBeHidden();
});