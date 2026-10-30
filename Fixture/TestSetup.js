import { test as base } from '@playwright/test';
import BasePage from '../Pages/BasePage.js';
import { attachScreenshotAfterEach } from '../utilities/screenshot.js';
import { AppConfig } from '../testdata/AppConfig.js';

export const test = base.extend({
  // Auto fixture: runs for every UI test that imports this file.
  pageSetup: [
    async ({ page }, use, testInfo) => {
      const basePage = new BasePage(page);
      await basePage.navigate(AppConfig.loginUrl);
      await use();
      // Screenshot after each test. Done here (not a top-level test.afterEach in a helper
      // file) so it reliably applies to every spec file.
      await attachScreenshotAfterEach(page, testInfo).catch(() => {});
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
