
import ConfirmHotel from '../Pages/ConfirmHotel';
import LoginPage from '../Pages/LoginPage';
import SearchHotel from '../Pages/SearchHotel';
import SelectHotel from '../Pages/SelectHotel';
import BookHotel from '../Pages/BookHotel';
import SearchData from '../testdata/SearchData.json';
import BookData from '../testdata/BookData.json';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig';

test.describe('Confirm Hotel Suite', () => {
  let confirmHotelPage;
  let loginPage;
  let searchHotelPage;
  let selectHotelPage;
  let bookHotelPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    searchHotelPage = new SearchHotel(page);
    selectHotelPage = new SelectHotel(page);
    bookHotelPage = new BookHotel(page);
    confirmHotelPage = new ConfirmHotel(page);

    const sData = SearchData.ValidUser[0];
    const bData = BookData.BookingData[0];

    // 1. Login
    await loginPage.gotoUrl(AppConfig.loginUrl);
    await loginPage.login(AppConfig.username, AppConfig.password);

    // 2. Search Hotel — Page Object handles screenshots internally
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
    await attachStepScreenshot(page, 'Search Hotel Completed');

    // 3. Select Hotel
    await selectHotelPage.selectHotel(sData.selectHotelRadioButton, sData.continueButton);
    await attachStepScreenshot(page, 'Hotel Selected');

    // 4. Book Hotel — Page Object handles screenshots internally
    await bookHotelPage.bookingHotel(
      bData.FirstName,
      bData.LastName,
      bData.BillingAddress,
      bData.CreditCardNo,
      bData.CreditCardType,
      bData.ExpiryMonth,
      bData.ExpiryYear,
      bData.CVVNumber
    );
    await attachStepScreenshot(page, 'Hotel Booking Submitted');
  });

  test('Confirm Hotel and View Itinerary Test Case', async ({ page }) => {
    await test.step('Verify Confirmation Page URL', async () => {
        await expect(page).toHaveURL(AssertionData.assertions[0].booking_confirm_url);
        await attachStepScreenshot(page, 'Confirm Hotel Page Loaded');
    });

    // Navigates directly to the Booked Itinerary page after booking confirmation
    await test.step('Navigate to My Itinerary', async () => {
        await confirmHotelPage.goToMyItinerary();
    });
  });
});
