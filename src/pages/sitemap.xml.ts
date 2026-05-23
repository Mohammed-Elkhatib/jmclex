import type { APIRoute } from 'astro';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Homepage -->
  <url>
    <loc>https://jmclex.com/</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/?lang=zh"/>
  </url>

  <!-- Strategic Advisory -->
  <url>
    <loc>https://jmclex.com/strategic-advisory</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/strategic-advisory"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/strategic-advisory?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/strategic-advisory?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/strategic-advisory?lang=zh"/>
  </url>

  <!-- High-Stakes Cases -->
  <url>
    <loc>https://jmclex.com/high-stakes-cases</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/high-stakes-cases"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/high-stakes-cases?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/high-stakes-cases?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/high-stakes-cases?lang=zh"/>
  </url>

  <!-- Legal Expertise -->
  <url>
    <loc>https://jmclex.com/expertise</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/expertise"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/expertise?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/expertise?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/expertise?lang=zh"/>
  </url>

  <!-- Expertise Detail Pages (Dynamic) -->
  <url>
    <loc>https://jmclex.com/expertise/corporate-law</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/expertise/corporate-law"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/expertise/corporate-law?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/expertise/corporate-law?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/expertise/corporate-law?lang=zh"/>
  </url>

  <!-- Publications -->
  <url>
    <loc>https://jmclex.com/publications</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/publications"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/publications?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/publications?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/publications?lang=zh"/>
  </url>

  <!-- Training Center -->
  <url>
    <loc>https://jmclex.com/training</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/training"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/training?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/training?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/training?lang=zh"/>
  </url>

  <!-- Executive Training Center -->
  <url>
    <loc>https://jmclex.com/executive-training-center</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/executive-training-center"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/executive-training-center?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/executive-training-center?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/executive-training-center?lang=zh"/>
  </url>

  <!-- Jurisprudence Database -->
  <url>
    <loc>https://jmclex.com/jurisprudence</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/jurisprudence"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/jurisprudence?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/jurisprudence?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/jurisprudence?lang=zh"/>
  </url>

  <!-- Contract Intelligence -->
  <url>
    <loc>https://jmclex.com/contract-intelligence</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/contract-intelligence"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/contract-intelligence?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/contract-intelligence?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/contract-intelligence?lang=zh"/>
  </url>

  <!-- Executive International Contracts -->
  <url>
    <loc>https://jmclex.com/executive-international-contracts</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/executive-international-contracts"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/executive-international-contracts?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/executive-international-contracts?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/executive-international-contracts?lang=zh"/>
  </url>

  <!-- Talent Network -->
  <url>
    <loc>https://jmclex.com/talent-network</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/talent-network"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/talent-network?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/talent-network?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/talent-network?lang=zh"/>
  </url>

  <!-- Talent Network - Research Publications -->
  <url>
    <loc>https://jmclex.com/talent-network/research-publications</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/talent-network/research-publications"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/talent-network/research-publications?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/talent-network/research-publications?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/talent-network/research-publications?lang=zh"/>
  </url>

  <!-- Talent Network - Legal Advisory -->
  <url>
    <loc>https://jmclex.com/talent-network/legal-advisory</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/talent-network/legal-advisory"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/talent-network/legal-advisory?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/talent-network/legal-advisory?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/talent-network/legal-advisory?lang=zh"/>
  </url>

  <!-- Talent Network - Business Development -->
  <url>
    <loc>https://jmclex.com/talent-network/business-development</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/talent-network/business-development"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/talent-network/business-development?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/talent-network/business-development?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/talent-network/business-development?lang=zh"/>
  </url>

  <!-- Talent Network - Compliance & Governance -->
  <url>
    <loc>https://jmclex.com/talent-network/compliance-governance</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/talent-network/compliance-governance"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/talent-network/compliance-governance?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/talent-network/compliance-governance?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/talent-network/compliance-governance?lang=zh"/>
  </url>

  <!-- Talent Network - Tax Structuring -->
  <url>
    <loc>https://jmclex.com/talent-network/tax-structuring</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/talent-network/tax-structuring"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/talent-network/tax-structuring?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/talent-network/tax-structuring?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/talent-network/tax-structuring?lang=zh"/>
  </url>

  <!-- Talent Network - Cross-Border Experts -->
  <url>
    <loc>https://jmclex.com/talent-network/cross-border-experts</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/talent-network/cross-border-experts"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/talent-network/cross-border-experts?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/talent-network/cross-border-experts?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/talent-network/cross-border-experts?lang=zh"/>
  </url>

  <!-- AI Legal Infrastructure -->
  <url>
    <loc>https://jmclex.com/ai-legal-infrastructure</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/ai-legal-infrastructure"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/ai-legal-infrastructure?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/ai-legal-infrastructure?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/ai-legal-infrastructure?lang=zh"/>
  </url>

  <!-- Global Presence -->
  <url>
    <loc>https://jmclex.com/global-presence</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/global-presence"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/global-presence?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/global-presence?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/global-presence?lang=zh"/>
  </url>

  <!-- Team -->
  <url>
    <loc>https://jmclex.com/team</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/team"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/team?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/team?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/team?lang=zh"/>
  </url>

  <!-- About -->
  <url>
    <loc>https://jmclex.com/about</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/about?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/about?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/about?lang=zh"/>
  </url>

  <!-- Consultation -->
  <url>
    <loc>https://jmclex.com/consultation</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/consultation"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/consultation?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/consultation?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/consultation?lang=zh"/>
  </url>

  <!-- Contact -->
  <url>
    <loc>https://jmclex.com/contact</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/contact"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/contact?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/contact?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/contact?lang=zh"/>
  </url>

  <!-- Privacy Policy -->
  <url>
    <loc>https://jmclex.com/privacy</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/privacy"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/privacy?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/privacy?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/privacy?lang=zh"/>
  </url>

  <!-- Terms of Service -->
  <url>
    <loc>https://jmclex.com/terms</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/terms"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/terms?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/terms?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/terms?lang=zh"/>
  </url>

  <!-- Legal Disclaimer -->
  <url>
    <loc>https://jmclex.com/disclaimer</loc>
    <lastmod>2026-05-23</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://jmclex.com/disclaimer"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://jmclex.com/disclaimer?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://jmclex.com/disclaimer?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://jmclex.com/disclaimer?lang=zh"/>
  </url>
</urlset>`;

export const GET: APIRoute = () => {
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
