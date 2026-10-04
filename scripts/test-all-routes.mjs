import http from 'http';

console.log('--- ROBOVEDANTA TEST SUITE ---');

const BASE_URL = 'http://localhost:3000';

async function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(typeof options.body === 'object' ? JSON.stringify(options.body) : options.body);
    req.end();
  });
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  async function assert(testName, condition) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // Test 1: Unauthenticated GET on /api/contact should fail (401)
    const getUnauth = await makeRequest('/api/contact');
    await assert('Unauthenticated API GET returns 401', getUnauth.status === 401);

    // Test 2: Unauthenticated DELETE on /api/contact should fail (401)
    const delUnauth = await makeRequest('/api/contact?id=123', { method: 'DELETE' });
    await assert('Unauthenticated API DELETE returns 401', delUnauth.status === 401);

    // Test 3: Unauthenticated PATCH on /api/contact should fail (401)
    const patchUnauth = await makeRequest('/api/contact?id=123', { method: 'PATCH' });
    await assert('Unauthenticated API PATCH returns 401', patchUnauth.status === 401);

    // Test 4: Public POST on /api/contact (missing fields -> 400)
    const postInvalid = await makeRequest('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'Test' }
    });
    await assert('Public Contact POST invalid validation (400)', postInvalid.status === 400);

    // Test 5: Admin login with wrong password should fail (401)
    const wrongLogin = await makeRequest('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { password: 'WrongPassword' }
    });
    await assert('Admin login invalid password (401)', wrongLogin.status === 401);

    // Test 6: Admin login with correct password should set cookie
    const correctLogin = await makeRequest('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { password: process.env.ADMIN_PASSWORD || 'RoboVedanta@2026' }
    });
    await assert('Admin login correct password (200)', correctLogin.status === 200 && correctLogin.body.success === true);

    console.log(`\nTEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  } catch (err) {
    console.error('Test execution error:', err);
  }
}

runTests();
