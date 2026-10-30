import { test, expect } from '@playwright/test';
import { attachApiLog } from '../../utilities/apiLogger';
import { UserApi, newTestUser } from '../../PagesAPI/UserApi.js';

test('Patch', async ({ request }) => {
  const api = new UserApi(request);
  const user = newTestUser('patch');

  // PATCH needs a logged-in user (without login the API returns 401)
  await api.registerAndLogin(user);

  const patch = await api.updateAccount({
    fullname: `${user.username} updated`,
    email: `updated_${user.email}`,
  });
  const patchResponse = await patch.json();
  console.log('PATCH Response:', patchResponse);

  await attachApiLog('PATCH API Output', {
    method: 'PATCH',
    url: patch.url(),
    status: patch.status(),
    statusText: patch.statusText(),
    response: patchResponse,
  });

  expect(patch.status()).toBe(200);

  // Cleanup: remove the test user (best effort)
  await api.deleteAccount().catch(() => {});
});
