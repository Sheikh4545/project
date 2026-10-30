import SelectHotel from '../Pages/SelectHotel';
import SearchHotel from '../Pages/SearchHotel';
import LoginPage from '../Pages/LoginPage';
import SearchData from '../testdata/SearchData.json';
import LoginData from '../testdata/LoginData.json';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';

test.describe('Select Hotel Suite', () => {
  let selectHotelPage;
  let searchHotelPage;
  let loginPage;
  let selectData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    searchHotelPage = new SearchHotel(page);
    selectHotelPage = new SelectHotel(page);
    selectData = SearchData.ValidUser[0];
    const creds = LoginData.ValidUser[0];

    
     await loginPage.gotoUrl();
     await loginPage.login(creds.username, creds.password);

    await searchHotelPage.searchHotel(
      selectData.searchLocation,
      selectData.searchHotel,
      selectData.searchRoomType,
      selectData.searchNumberOfRooms,
      selectData.searchCheckInDate,
      selectData.searchCheckOutDate,
      selectData.searchAdultsPerRoom,
      selectData.searchChildrenPerRoom
    );
  });

  test('Select Hotel Test Case', async ({ page }) => {
  
    await selectHotelPage.selectHotel(
      selectData.selectHotelRadioButton,
      selectData.continueButton
    );

    await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
    await attachStepScreenshot(page, 'Select Hotel Successful');
  });
});