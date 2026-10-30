
import BookHotel from '../Pages/BookHotel';
import LoginPage from '../Pages/LoginPage';
import SearchHotel from '../Pages/SearchHotel';
import SelectHotel from '../Pages/SelectHotel';
import BookData from '../testdata/BookData.json';
import SearchData from '../testdata/SearchData.json';
import Logout from '../Pages/Logout';
import { test, expect } from '../Fixture/TestSetup';
import { attachStepScreenshot } from '../utilities/screenshot';
import AssertionData from '../testdata/AssertionData.json';
import { AppConfig } from '../testdata/AppConfig';

test.describe('Book Hotel Suite', () => {
  let bookHotel;
  let logout;
  let bookData;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const searchHotelPage = new SearchHotel(page);
    const selectHotelPage = new SelectHotel(page);
    bookHotel = new BookHotel(page);
    logout = new Logout(page);
    bookData = BookData.BookingData[0];
    const sData = SearchData.ValidUser[0];

    // BookHotel.php only shows the booking form after Login -> Search -> Select.
    // Opening it directly has no form (#first_name missing), so we walk the flow first.
    await loginPage.gotoUrl();
    await loginPage.login(AppConfig.username, AppConfig.password);
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
    await selectHotelPage.selectHotel();
    await expect(page).toHaveURL(AssertionData.assertions[0].book_hotel_url);
  });

  test.afterEach(async () => {
    await logout.performLogout();
  });

  test('Book Hotel Test Case', async ({ page }) => {
    await test.step('Fill Booking Details and Submit', async () => {
      await bookHotel.bookingHotel(
        bookData.FirstName,
        bookData.LastName,
        bookData.BillingAddress,
        bookData.CreditCardNo,
        bookData.CreditCardType,
        bookData.ExpiryMonth,
        bookData.ExpiryYear,
        bookData.CVVNumber
      );
    });

    await test.step('Verify Booking Success', async () => {
      // After "Book Now" the app moves to the confirmation page
      await expect(page).toHaveURL(AssertionData.assertions[0].booking_confirm_url);
      await attachStepScreenshot(page, 'Book Hotel Successful');
    });
  });
});
