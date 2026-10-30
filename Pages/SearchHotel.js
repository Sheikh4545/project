
import { attachStepScreenshot } from '../utilities/screenshot.js';
import { test } from '../Fixture/TestSetup.js';
import { AppConfig } from '../testdata/AppConfig.js';
class SearchHotel {
    constructor(page) {
        this.page = page;
        this.location = page.locator('#location');
        this.hotels = page.locator('#hotels');
        this.roomType = page.locator('#room_type');
        this.numberOfRooms = page.locator('#room_nos');
        this.checkInDate = page.locator('#datepick_in');
        this.checkOutDate = page.locator('#datepick_out');
        this.adultsPerRoom = page.locator('#adult_room');
        this.childrenPerRoom = page.locator('#child_room');
        this.searchButton = page.locator('#Submit');
    }

    async gotosearch() {
        await this.page.goto(AppConfig.searchUrl);
    }

    async searchHotel(location, hotels, roomType, numberOfRooms, checkInDate, checkOutDate, adultsPerRoom, childrenPerRoom) {
        
        await test.step('Enter Location', async () => {
            await this.location.selectOption(location);
            await attachStepScreenshot(this.page, '001 - After Location');
        });
           await test.step('Enter hotels', async () => {
            await this.hotels.selectOption(hotels);
            await attachStepScreenshot(this.page, '01 - After hotels');
        });


        await test.step('Enter RoomType', async () => {
            await this.roomType.selectOption(roomType);
            await attachStepScreenshot(this.page, '02 - After RoomType');  
        });

        await test.step('Enter Number of Rooms', async () => {        
            await this.numberOfRooms.selectOption(numberOfRooms);
            await attachStepScreenshot(this.page, '03 - After NumberOfRooms');  
        });

        await test.step('Enter CheckInDate', async () => {      
            await this.checkInDate.fill(checkInDate); 
            await attachStepScreenshot(this.page, '04 - After CheckInDate'); 
        });

        await test.step('Enter CheckOutDate', async () => {  
            await this.checkOutDate.fill(checkOutDate);
            await attachStepScreenshot(this.page, '05 - After CheckOutDate'); 
        });

        await test.step('Enter AdultsPerRoom', async () => {
            await this.adultsPerRoom.selectOption(adultsPerRoom);
            await attachStepScreenshot(this.page, '06 - After AdultsPerRoom'); 
        });

        await test.step('Enter ChildPerRoom', async () => {
            await this.childrenPerRoom.selectOption(childrenPerRoom);
            await attachStepScreenshot(this.page, '07 - After ChildPerRoom'); 
        });

        await test.step('Click Search Button', async () => {
            await this.searchButton.click();
            await attachStepScreenshot(this.page, '08 - After Search Click'); 
        });
    }
}

export default SearchHotel;