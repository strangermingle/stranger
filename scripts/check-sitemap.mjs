import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '../src/app');
const sitemapFile = path.resolve(__dirname, '../src/app/sitemap.ts');

if (!fs.existsSync(appDir) || !fs.existsSync(sitemapFile)) {
  console.log('[check-sitemap] appDir or sitemap.ts not found, skipping check.');
  process.exit(0);
}

const sitemapContent = fs.readFileSync(sitemapFile, 'utf8');

// Known cities dynamically handled in sitemap.ts
const CITIES = new Set([
  'ahmedabad', 'bangalore', 'bhopal', 'chennai', 'coimbatore',
  'delhi', 'hyderabad', 'indore', 'jaipur', 'kanpur', 'kolkata',
  'lucknow', 'ludhiana', 'mumbai', 'nagpur', 'patna', 'pune',
  'surat', 'vadodara', 'visakhapatnam'
]);

// Intentionally private/utility routes that should NOT be in the sitemap
const EXCLUDED_ROUTES = new Set([
  '/booking-confirmed',
  '/reset-password',
  '/verify-membership',
  '/anonymous-chat-in-india-with-real-people', // 307 redirect to /annonymous-...
  '/members/login',                           // 307 redirect to /members?mode=login
  '/members/calls',
  '/members/chat',
  '/members/games',
  '/members/groups',
  '/members/profile',
  '/members/coupons',
  '/members/travel',
  '/members/rent-a-friend/register',          // Redirects to /rent-a-friend-registration
]);

function getPageRoutes(dir, baseRoute = '') {
  const routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes.push(...getPageRoutes(path.join(dir, entry.name), `${baseRoute}/${entry.name}`));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }

  return routes;
}

const allRoutes = getPageRoutes(appDir);
const missingPublicRoutes = [];

for (const route of allRoutes) {
  // Ignore dynamic routes like [slug]
  if (route.includes('[')) continue;

  // Ignore explicitly excluded routes
  if (EXCLUDED_ROUTES.has(route)) continue;

  // Check if route is a city or city subpage handled dynamically
  const parts = route.replace(/^\//, '').split('/');
  if (CITIES.has(parts[0])) {
    // City subpages like /mumbai/house-parties or /pune/... are generated dynamically in sitemap.ts
    continue;
  }

  // Check if path is present in sitemap.ts
  const searchPattern = route === '/' ? 'url: BASE_URL' : `\${BASE_URL}${route}`;
  if (!sitemapContent.includes(searchPattern)) {
    missingPublicRoutes.push(route);
  }
}

if (missingPublicRoutes.length > 0) {
  console.warn('\n⚠️  [check-sitemap] WARNING: Public pages missing from src/app/sitemap.ts:');
  missingPublicRoutes.forEach((r) => console.warn(`   - ${r}`));
  console.warn('   Please ensure all public pages are added to staticPages in src/app/sitemap.ts for SEO!\n');
} else {
  console.log('✅ [check-sitemap] All public static pages are accounted for in sitemap.ts.');
}

