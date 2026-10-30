import { test, expect } from '@playwright/test'; 

test('Validate Book API Response', async ({ request }) => {

const response = await request.get('https://demoqa.com/BookStore/v1/Books');

//const responseBody = await response.json();
expect(response.status()).toBe(200);
});

