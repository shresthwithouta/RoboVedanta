import { cookies } from 'next/headers';


const COOKIE_NAME = 'rv_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function generateSessionToken() {
  const secret = process.env.ADMIN_SECRET || 'robovedanta-default-secret-change-me';
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const timestamp = Math.floor(Date.now() / 1000);
  const data = `admin:${timestamp}`;
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const sigHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return `${timestamp}.${sigHex}`;
}

export async function verifySessionToken(token) {
  if (!token) return false;
  
  try {
    const [timestampStr, sigHex] = token.split('.');
    if (!timestampStr || !sigHex) return false;

    const timestamp = parseInt(timestampStr, 10);
    const now = Math.floor(Date.now() / 1000);
    
    if (now - timestamp > SESSION_MAX_AGE) return false;

    const secret = process.env.ADMIN_SECRET || 'robovedanta-default-secret-change-me';
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const data = `admin:${timestampStr}`;
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    const expectedHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return sigHex === expectedHex;
  } catch {
    return false;
  }
}

export function verifyPassword(password) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set!');
    return false;
  }
  return password === adminPassword;
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie) return false;
  return verifySessionToken(sessionCookie.value);
}

export { COOKIE_NAME, SESSION_MAX_AGE };
