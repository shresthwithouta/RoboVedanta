import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith('/admin');
  const isProtectedAPI = 
    (pathname.startsWith('/api/school-registrations') ||
     pathname.startsWith('/api/program-registrations') ||
     pathname.startsWith('/api/contact')) &&
    (request.method === 'GET' || request.method === 'DELETE' || request.method === 'PATCH' || request.method === 'PUT');

  if (
    pathname.startsWith('/api/admin/') ||
    pathname === '/admin/login'
  ) {
    return NextResponse.next();
  }

  if (
    (pathname.startsWith('/api/school-registrations') ||
     pathname.startsWith('/api/program-registrations') ||
     pathname.startsWith('/api/contact')) &&
    request.method === 'POST'
  ) {
    return NextResponse.next();
  }

  if (isAdminPage || isProtectedAPI) {
    const sessionCookie = request.cookies.get('rv_admin_session');

    if (!sessionCookie?.value) {
      if (isAdminPage) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      const token = sessionCookie.value;
      const [timestampStr, sigHex] = token.split('.');
      if (!timestampStr || !sigHex) throw new Error('Invalid token format');

      const timestamp = parseInt(timestampStr, 10);
      const now = Math.floor(Date.now() / 1000);
      const maxAge = 60 * 60 * 24 * 7;

      if (now - timestamp > maxAge) throw new Error('Token expired');

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

      if (sigHex !== expectedHex) throw new Error('Invalid signature');

      return NextResponse.next();
    } catch {
      if (isAdminPage) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/school-registrations/:path*',
    '/api/program-registrations/:path*',
    '/api/contact/:path*',
  ],
};
