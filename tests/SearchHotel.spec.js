
import LoginPage from '../Pages/LoginPage';
import SearchHotel from '../Pages/SearchHotel';
import SearchData from '../testdata/SearchData.json';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig.js';

test.describe('Search Hotel Suite', () => {
  let searchHotelPage;
  let loginPage;
  const sData = SearchData.ValidUser[0];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    searchHotelPage = new SearchHotel(page);

    // Login in every test (fresh session) instead of reusing a shared auth.json
    await loginPage.gotoUrl();
    await loginPage.login(AppConfig.username, AppConfig.password);
    await expect(page).toHaveURL(AssertionData.assertions[0].search_hotel_url);
  });

  test('SearchHotel with valid data', async ({ page }) => {
    await searchHotelPage.searchHotel(
      sData.searchLocation,
      sData.searchHotel,
      sData.searchRoomType,
      sData.searchNumberOfRooms,
      sData.searchCheckInDate,
      sData.searchCheckOutDate,
      sData.searchAdultsPerRoom,
      sData.searchChildrenPerRoom
    );
    await expect(page).toHaveURL(AssertionData.assertions[0].select_hotel_url);
    await attachStepScreenshot(page, 'Search Page loaded');
  });
});
