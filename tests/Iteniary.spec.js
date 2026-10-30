
import { test, expect } from '../Fixture/TestSetup';
import Itinerary from '../Pages/Iteniary.js'; 
import LoginPage from '../Pages/LoginPage';
import LoginData from '../testdata/LoginData.json';
import AssertionData from '../testdata/AssertionData.json';
import { attachStepScreenshot } from '../utilities/screenshot';
import { AppConfig } from '../testdata/AppConfig.js';

test.describe('Iteniary Suite', () => {
  let itineraryPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    itineraryPage = new Itinerary(page);

    const data = LoginData.ValidUser[0];
    
    // 1. Login
    await loginPage.gotoUrl(AppConfig.loginUrl);
    await loginPage.login(AppConfig.username, AppConfig.password);

    // 2. Navigate to the Itinerary page 
    await itineraryPage.gotoItinerary();
  });

  test('Itinerary Test Case', async ({ page }) => {
    // 3. Verify that we have successfully landed on the Itinerary URL
    await test.step('Verify Itinerary Page URL', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].my_itinerary_url);
        await attachStepScreenshot(page, 'My Itinerary Page Loaded');
    });

    // 4. Perform any follow-up itinerary action defined in your page object
    await itineraryPage.verifyItinerary();
    await attachStepScreenshot(page, 'Verify Itinerary Action Complete');
  });
});