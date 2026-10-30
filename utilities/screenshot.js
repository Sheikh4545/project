import { test } from '@playwright/test';

/** Take a screenshot, but never fail the test because of it
 *  (e.g. "Unable to capture screenshot" while the page is mid-navigation). */
async function safeScreenshot(page, name) {
  try {
    await page.waitForLoadState('domcontentloaded').catch(() => {});
    return await page.screenshot({ timeout: 30_000 });
  } catch (error) {
    console.warn(`Screenshot "${name}" skipped: ${error.message.split('\n')[0]}`);
    return null;
  }
}

/** During-test attachment (Allure / HTML report). Only call inside a running test. */
export async function attachStepScreenshot(page, name) {
  const body = await safeScreenshot(page, name);
  if (body) await test.info().attach(name, { body, contentType: 'image/png' });
}

/** Post-test screenshots for reports; called from the auto fixture after each test. */
export async function attachScreenshotAfterEach(page, testInfo) {
  const body = await safeScreenshot(page, 'Final Screenshot');
  if (!body) return;
  await testInfo.attach('Final Screenshot', { body, contentType: 'image/png' });
  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('Failure Screenshot', { body, contentType: 'image/png' });
  }
}
