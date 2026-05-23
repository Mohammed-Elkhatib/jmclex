import type { APIRoute } from 'astro';

const robots = `# JMC LEX - robots.txt
# Robots exclusion file for search engine crawlers

# Allow all crawlers by default
User-agent: *
Allow: /

# Disallow private/admin areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /.env
Disallow: /.git

# Specify sitemap location
Sitemap: https://jmclex.com/sitemap.xml

# Crawl delay (optional - adjust based on server capacity)
Crawl-delay: 1

# Specific rules for Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Specific rules for Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /
`;

export const GET: APIRoute = () => {
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
