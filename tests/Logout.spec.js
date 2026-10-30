
import { attachStepScreenshot } from '../utilities/screenshot.js';
import AssertionData from '../testdata/AssertionData.json';
import { test, expect } from '../Fixture/TestSetup.js';
import { AppConfig } from '../testdata/AppConfig.js';
import Logout from '../Pages/Logout.js';
import LoginPage from '../Pages/LoginPage.js';

// import BookHotelPage from '../Pages/BookHotelPage.js'; // Imagine have a hotel booking page object

test('Book Hotel and Logout Test Case', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const logout = new Logout(page);

  
    await test.step('Login to Application', async () => {
        await loginPage.gotoUrl(AppConfig.loginUrl);
        await loginPage.login(AppConfig.username, AppConfig.password);
    });

    
    await test.step('Book a Hotel', async () => {
    });

   
    await test.step('Perform Logout', async () => {
        await logout.performLogout();
    });

   
    await test.step('Verify Logout Success', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].logout_url);
        await attachStepScreenshot(page, 'Logout Successful after Booking');
    });
});