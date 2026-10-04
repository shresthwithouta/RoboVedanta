export default function sitemap() {
  const baseUrl = 'https://robovedanta.com';

  const routes = [
    '',
    '/about',
    '/programs',
    '/curriculum',
    '/schools',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
