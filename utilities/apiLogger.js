import * as allure from 'allure-js-commons';

// Basic JSON attachment
export async function attachApiLog(title, data) {
  await allure.attachment(
    title,
    JSON.stringify(data, null, 2),
    'application/json'
  );
}

// Advanced helper that automatically captures HTTP Status + Body together
export async function attachApiResponse(title, response, responseBody) {
  const logData = {
    url: response.url(),
    status: response.status(),
    statusText: response.statusText(),
    body: responseBody
  };

  await allure.attachment(
    title,
    JSON.stringify(logData, null, 2),
    'application/json'
  );
}