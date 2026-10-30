
import { attachStepScreenshot } from '../utilities/screenshot.js';
import { test } from '../Fixture/TestSetup.js';
import { AppConfig } from '../testdata/AppConfig.js';

class BookHotel {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.billingAddress = page.locator('#address');
        this.creditCardNo = page.locator('#cc_num');
        this.creditCardType = page.locator('#cc_type');
        this.expiryMonth = page.locator('#cc_exp_month');
        this.expiryYear = page.locator('#cc_exp_year');
        this.cvvNumber = page.locator('#cc_cvv');
        this.bookNowButton = page.locator('#book_now');
    }

    async gotosearch() {
        await this.page.goto(AppConfig.bookurl);
    }

    async bookingHotel(firstName, lastName, billingAddress, creditCardNo, creditCardType, expiryMonth, expiryYear, cvvNumber) {
        await test.step('Enter first name', async () => {
            await this.firstName.fill(firstName);
            await attachStepScreenshot(this.page, '01 - After first name');
        });

        await test.step('Enter last name', async () => {
            await this.lastName.fill(lastName);
            await attachStepScreenshot(this.page, '02 - After last name');
        });

        await test.step('Enter billing address', async () => {
            await this.billingAddress.fill(billingAddress);
            await attachStepScreenshot(this.page, '03 - After billing address');
        });

        await test.step('Enter credit card number', async () => {
            await this.creditCardNo.fill(creditCardNo);
            await attachStepScreenshot(this.page, '04 - After credit card number');
        });

        await test.step('Select credit card type', async () => {
            await this.creditCardType.selectOption(creditCardType);
            await attachStepScreenshot(this.page, '05 - After credit card type');
        });

        await test.step('Select expiry month', async () => {
            await this.expiryMonth.selectOption(expiryMonth);
            await attachStepScreenshot(this.page, '06 - After expiry month');
        });

        await test.step('Select expiry year', async () => {
            await this.expiryYear.selectOption(expiryYear);
            await attachStepScreenshot(this.page, '07 - After expiry year');
        });

        await test.step('Enter CVV number', async () => {
            await this.cvvNumber.fill(cvvNumber);
            await attachStepScreenshot(this.page, '08 - After CVV number');
        });

        await test.step('Click book now button', async () => {
            await this.bookNowButton.click();
            await attachStepScreenshot(this.page, '09 - After book now click');
        });
    }
}

export default BookHotel;