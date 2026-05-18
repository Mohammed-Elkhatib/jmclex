/**
 * Centralized Metadata Architecture
 * Hybrid system with global defaults and page-level overrides
 * Minimal, maintainable, scalable, and performance-efficient
 */

export interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  canonicalUrl?: string;
  hreflang?: Array<{ lang: string; url: string }>;
  structuredData?: Record<string, any>;
  noindex?: boolean;
}

// Global defaults - institutional authority signals
export const GLOBAL_METADATA = {
  siteName: 'JMC LEX',
  siteUrl: 'https://jmclex.com',
  description: 'International legal advisory, cross-border compliance, and strategic business counsel for multinational corporations and high-net-worth individuals across EMEA.',
  keywords: [
    'international law',
    'cross-border legal advisory',
    'compliance',
    'corporate law',
    'EMEA legal services',
    'strategic legal counsel',
    'geopolitical law',
    'international sanctions',
  ],
  author: 'JMC LEX',
  twitterHandle: '@jmclex',
  defaultOgImage: 'https://static.wixstatic.com/media/5e1235_71982afc946a48a4ba145d5a053130cb~mv2.png',
  language: 'en',
  locale: 'en_GB',
} as const;

/**
 * Organization Schema - Institutional Authority
 * Establishes entity identity, credibility, and international presence
 */
export const getOrganizationSchema = (overrides?: Partial<any>) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: GLOBAL_METADATA.siteName,
  url: GLOBAL_METADATA.siteUrl,
  description: GLOBAL_METADATA.description,
  sameAs: [
    'https://linkedin.com/company/jmclex',
    'https://twitter.com/jmclex',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Legal Advisory',
    email: 'info@jmclex.com',
    availableLanguage: ['en', 'fr', 'de', 'es'],
  },
  areaServed: [
    'GB',
    'FR',
    'DE',
    'ES',
    'IT',
    'NL',
    'BE',
    'CH',
    'AT',
    'SE',
    'NO',
    'DK',
    'FI',
    'PL',
    'CZ',
    'HU',
    'RO',
    'GR',
    'PT',
    'IE',
  ],
  ...overrides,
});

/**
 * LocalBusiness Schema - International Presence
 * Reinforces multi-jurisdictional authority and accessibility
 */
export const getLocalBusinessSchema = (location: {
  city: string;
  country: string;
  address: string;
  phone?: string;
  email?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: GLOBAL_METADATA.siteName,
  description: GLOBAL_METADATA.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: location.address,
    addressLocality: location.city,
    addressCountry: location.country,
  },
  telephone: location.phone,
  email: location.email,
  url: GLOBAL_METADATA.siteUrl,
  sameAs: [
    'https://linkedin.com/company/jmclex',
    'https://twitter.com/jmclex',
  ],
});

/**
 * BreadcrumbList Schema - Navigation Authority
 * Improves crawlability and user experience signals
 */
export const getBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${GLOBAL_METADATA.siteUrl}${item.url}`,
  })),
});

/**
 * Article Schema - Publications Authority
 * Establishes thought leadership and content credibility
 */
export const getArticleSchema = (article: {
  title: string;
  description: string;
  content: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  image?: string;
  category?: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  articleBody: article.content,
  image: article.image || GLOBAL_METADATA.defaultOgImage,
  author: {
    '@type': 'Organization',
    name: article.author || GLOBAL_METADATA.siteName,
  },
  publisher: {
    '@type': 'Organization',
    name: GLOBAL_METADATA.siteName,
    logo: {
      '@type': 'ImageObject',
      url: GLOBAL_METADATA.defaultOgImage,
    },
  },
  datePublished: article.publishedDate,
  dateModified: article.modifiedDate || article.publishedDate,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${GLOBAL_METADATA.siteUrl}${article.url}`,
  },
  keywords: article.category ? [article.category, ...GLOBAL_METADATA.keywords] : GLOBAL_METADATA.keywords,
});

/**
 * Page-level metadata builder
 * Combines global defaults with page-specific overrides
 */
export const buildPageMetadata = (
  pageConfig: Partial<MetadataConfig>
): MetadataConfig => ({
  title: pageConfig.title || GLOBAL_METADATA.siteName,
  description: pageConfig.description || GLOBAL_METADATA.description,
  keywords: pageConfig.keywords || GLOBAL_METADATA.keywords,
  ogImage: pageConfig.ogImage || GLOBAL_METADATA.defaultOgImage,
  ogType: pageConfig.ogType || 'website',
  canonicalUrl: pageConfig.canonicalUrl,
  hreflang: pageConfig.hreflang,
  structuredData: pageConfig.structuredData,
  noindex: pageConfig.noindex || false,
});

/**
 * SEO-focused publication metadata
 * Enhances Publications collection with authority signals
 */
export const getPublicationMetadata = (publication: {
  title: string;
  summary: string;
  content: string;
  author?: string;
  category?: string;
  publicationDate?: string;
  thumbnailImage?: string;
  _id: string;
}) => {
  const url = `/publications/${publication._id}`;
  return buildPageMetadata({
    title: `${publication.title} | JMC LEX Publications`,
    description: publication.summary,
    keywords: [
      publication.category || 'Legal Insight',
      'international law',
      'legal analysis',
      'strategic counsel',
      ...GLOBAL_METADATA.keywords,
    ],
    ogImage: publication.thumbnailImage || GLOBAL_METADATA.defaultOgImage,
    ogType: 'article',
    canonicalUrl: `${GLOBAL_METADATA.siteUrl}${url}`,
    structuredData: getArticleSchema({
      title: publication.title,
      description: publication.summary,
      content: publication.content,
      author: publication.author || GLOBAL_METADATA.siteName,
      publishedDate: publication.publicationDate,
      image: publication.thumbnailImage,
      category: publication.category,
      url,
    }),
  });
};

/**
 * Page metadata presets for common pages
 */
export const PAGE_METADATA_PRESETS = {
  home: {
    title: 'JMC LEX | International Legal Advisory & Cross-Border Compliance',
    description: GLOBAL_METADATA.description,
    keywords: GLOBAL_METADATA.keywords,
    ogType: 'website' as const,
  },
  publications: {
    title: 'Legal Publications & Strategic Insights | JMC LEX',
    description: 'Expert thought leadership on geopolitical law, international sanctions compliance, cross-border business strategy, and emerging regulatory developments.',
    keywords: [
      'legal publications',
      'thought leadership',
      'international law insights',
      'compliance analysis',
      ...GLOBAL_METADATA.keywords,
    ],
    ogType: 'website' as const,
  },
  expertise: {
    title: 'Legal Expertise & Practice Areas | JMC LEX',
    description: 'Comprehensive legal services across international corporate law, compliance, cross-border transactions, and strategic advisory.',
    keywords: [
      'legal expertise',
      'practice areas',
      'corporate law',
      'compliance services',
      ...GLOBAL_METADATA.keywords,
    ],
    ogType: 'website' as const,
  },
  team: {
    title: 'Expert Legal Team | JMC LEX',
    description: 'Meet our international team of legal experts specializing in cross-border advisory, compliance, and strategic counsel.',
    keywords: [
      'legal team',
      'international experts',
      'legal advisors',
      'cross-border specialists',
      ...GLOBAL_METADATA.keywords,
    ],
    ogType: 'website' as const,
  },
  consultation: {
    title: 'Schedule Legal Consultation | JMC LEX',
    description: 'Book a confidential consultation with our international legal experts for strategic advice on your business needs.',
    keywords: [
      'legal consultation',
      'advisory services',
      'expert counsel',
      'business strategy',
      ...GLOBAL_METADATA.keywords,
    ],
    ogType: 'website' as const,
  },
  contact: {
    title: 'Contact JMC LEX | International Legal Advisory',
    description: 'Get in touch with our team for inquiries about legal services, publications, or strategic partnerships.',
    keywords: [
      'contact',
      'legal services',
      'inquiry',
      'partnerships',
      ...GLOBAL_METADATA.keywords,
    ],
    ogType: 'website' as const,
  },
} as const;
