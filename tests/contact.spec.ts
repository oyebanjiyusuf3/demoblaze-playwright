import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Navbar } from '../pages/Navbar';
import { ContactModal } from '../pages/ContactModal';

test('Cannot send message with empty fields in Contact modal', async ({ page }) => {
  const base = new BasePage(page);
  const nav = new Navbar(page);
  const contact = new ContactModal(page);

  await base.gotoHome();
  await nav.openContact();

  // Try to send with all fields empty
  await page.fill('#recipient-email', '');
  await page.fill('#recipient-name', '');
  await page.fill('#message-text', '');

  let dialogShown = false;
  page.once('dialog', dialog => {
    dialogShown = true;
    // Fail if "Thanks for the message!!" is shown
    expect(dialog.message()).not.toContain('Thanks for the message!!');
    dialog.dismiss();
  });

  await page.click('button:has-text("Send message")');
  await page.waitForTimeout(1000);

  // Assert that no dialog was shown
  expect(dialogShown).toBeFalsy();

  // Modal should still be visible (no successful submission)
  await expect(page.locator('#exampleModal')).toBeVisible();

});