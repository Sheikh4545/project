// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Ignore draft or incomplete spec files with missing external dependencies */
  testIgnore: [
    '**/PostAPI.spec.js',
  ],
  timeout: 90 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  globalSetup: './utilities/global-setup.js',
  globalTeardown: './utilities/global-teardown.js',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    actionTimeout: 20000,
    navigationTimeout: 45000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects.
   * - "api" runs API specs ONCE (no browser), instead of 3x per browser.
   * - Browser projects log in inside each test. A shared auth.json session is NOT used,
   *   because Logout tests destroy that server session and break every test after them.
   */
  projects: [
    {
      name: 'api',
      testMatch: /API[\\/].*\.spec\.js/,
      testIgnore: ['**/PostAPI.spec.js'],
    },
    {
      name: 'chromium',
      testIgnore: ['**/API/**'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: ['**/API/**'],
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: ['**/API/**'],
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
