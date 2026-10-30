
import { attachStepScreenshot } from '../utilities/screenshot.js';
import { test } from '../Fixture/TestSetup.js';
import { AppConfig } from '../testdata/AppConfig.js';

class SelectHotel {
    constructor(page) {
        this.page = page;
        this.selectHotelRadioButton = page.locator('#radiobutton_0');
        this.continueButton = page.locator('#continue');
    }

    async gotosearch() {
        await this.page.goto(AppConfig.selecturl);
    }

    async selectHotel() {
        await test.step('Select hotel and continue', async () => {
            // Select the hotel radio button
            await test.step('Select hotel radio button', async () => {
                await this.selectHotelRadioButton.check();
                await attachStepScreenshot(this.page, '001 - After hotel selection');
            });

            // Click the continue button
            await test.step('Click continue button', async () => {
                await this.continueButton.click();
                await attachStepScreenshot(this.page, '002 - After continue click');
            });
        });
    }
}

export default SelectHotel;
