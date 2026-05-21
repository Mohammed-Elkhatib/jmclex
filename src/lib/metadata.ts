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
  siteUrl: 'https://www.jmclex.com',
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
 * Course Schema - Training Authority
 * Establishes educational credibility and course details
 */
export const getCourseSchema = (course: {
  name: string;
  description: string;
  provider?: string;
  duration?: string;
  level?: string;
  price?: number;
  image?: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.name,
  description: course.description,
  provider: {
    '@type': 'Organization',
    name: course.provider || GLOBAL_METADATA.siteName,
  },
  duration: course.duration ? `PT${course.duration}` : undefined,
  educationLevel: course.level || 'Advanced',
  image: course.image || GLOBAL_METADATA.defaultOgImage,
  url: `${GLOBAL_METADATA.siteUrl}${course.url}`,
  offers: course.price ? {
    '@type': 'Offer',
    price: course.price.toString(),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  } : undefined,
});

/**
 * Professional Service Schema - Service Authority
 * Establishes professional service credibility
 */
export const getProfessionalServiceSchema = (service: {
  name: string;
  description: string;
  areaServed?: string[];
  serviceType?: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: service.name,
  description: service.description,
  url: `${GLOBAL_METADATA.siteUrl}${service.url}`,
  areaServed: service.areaServed || [
    'GB', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'GR', 'PT', 'IE'
  ],
  serviceType: service.serviceType || 'Legal Services',
  priceRange: 'Contact for pricing',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Legal Advisory',
    email: 'info@jmclex.com',
  },
});

/**
 * Person Schema - Team Authority
 * Establishes individual expertise and credibility
 */
export const getPersonSchema = (person: {
  name: string;
  role?: string;
  expertise?: string;
  image?: string;
  email?: string;
  url?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.role,
  knowsAbout: person.expertise ? person.expertise.split(',').map(e => e.trim()) : [],
  image: person.image,
  email: person.email,
  url: person.url ? `${GLOBAL_METADATA.siteUrl}${person.url}` : undefined,
  worksFor: {
    '@type': 'Organization',
    name: GLOBAL_METADATA.siteName,
  },
});

/**
 * Page metadata presets for common pages
 */
export const PAGE_METADATA_PRESETS = {
  home: {
    title: 'International Legal Advisory & Cross-Border Compliance | JMC LEX',
    description: 'Premium international legal advisory for multinational corporations. Expert cross-border compliance, corporate law, and strategic counsel across EMEA.',
    keywords: [
      'international legal advisory',
      'cross-border compliance',
      'corporate law EMEA',
      'multinational legal services',
      'strategic legal counsel',
      'international sanctions compliance',
      'geopolitical law',
      'cross-border transactions',
    ],
    ogType: 'website' as const,
  },
  publications: {
    title: 'Legal Publications & Strategic Insights | JMC LEX',
    description: 'Expert thought leadership on geopolitical law, international sanctions compliance, cross-border M&A, and emerging regulatory developments affecting multinational enterprises.',
    keywords: [
      'legal publications',
      'thought leadership',
      'geopolitical law analysis',
      'international sanctions',
      'cross-border M&A insights',
      'compliance alerts',
      'regulatory updates',
      'strategic legal analysis',
    ],
    ogType: 'website' as const,
  },
  expertise: {
    title: 'Legal Expertise & Practice Areas | JMC LEX',
    description: 'Specialized legal services in corporate law, compliance, cross-border transactions, litigation, and strategic advisory for international business.',
    keywords: [
      'legal expertise',
      'practice areas',
      'international corporate law',
      'compliance services',
      'cross-border transactions',
      'litigation services',
      'strategic legal advisory',
      'EMEA legal specialists',
    ],
    ogType: 'website' as const,
  },
  team: {
    title: 'Expert Legal Team | JMC LEX',
    description: 'Meet our international team of legal experts specializing in cross-border advisory, compliance, and strategic counsel for multinational corporations.',
    keywords: [
      'legal team',
      'international legal experts',
      'legal advisors',
      'cross-border specialists',
      'compliance experts',
      'corporate law specialists',
      'EMEA legal professionals',
    ],
    ogType: 'website' as const,
  },
  consultation: {
    title: 'Schedule Legal Consultation | JMC LEX',
    description: 'Book a confidential consultation with our international legal experts for strategic advice on cross-border business, compliance, and corporate matters.',
    keywords: [
      'legal consultation',
      'advisory services',
      'expert counsel',
      'business strategy',
      'legal advice',
      'confidential consultation',
      'international legal services',
    ],
    ogType: 'website' as const,
  },
  contact: {
    title: 'Contact JMC LEX | International Legal Advisory',
    description: 'Get in touch with our international legal team for inquiries about services, publications, or strategic partnerships across EMEA.',
    keywords: [
      'contact JMC LEX',
      'legal services inquiry',
      'partnership opportunities',
      'international legal contact',
      'EMEA legal services',
    ],
    ogType: 'website' as const,
  },
  strategicAdvisory: {
    title: 'Strategic Legal Advisory | Cross-Border Business Strategy | JMC LEX',
    description: 'Strategic legal advisory for multinational corporations navigating complex cross-border transactions, regulatory challenges, and geopolitical risks.',
    keywords: [
      'strategic legal advisory',
      'cross-border business strategy',
      'geopolitical risk management',
      'multinational legal strategy',
      'regulatory advisory',
      'international business counsel',
    ],
    ogType: 'website' as const,
  },
  highStakesCases: {
    title: 'High-Stakes Legal Cases | Complex Litigation | JMC LEX',
    description: 'Complex multi-jurisdictional litigation and high-stakes case management for multinational corporations and high-net-worth individuals.',
    keywords: [
      'high-stakes litigation',
      'complex cases',
      'multi-jurisdictional litigation',
      'dispute resolution',
      'international litigation',
      'commercial disputes',
    ],
    ogType: 'website' as const,
  },
  aiLegalInfrastructure: {
    title: 'AI Legal Infrastructure & Technology Solutions | JMC LEX',
    description: 'Cutting-edge AI-powered legal infrastructure and technology solutions for compliance, contract intelligence, and legal operations.',
    keywords: [
      'AI legal technology',
      'legal infrastructure',
      'contract intelligence',
      'legal automation',
      'compliance technology',
      'legal operations',
    ],
    ogType: 'website' as const,
  },
  contractIntelligence: {
    title: 'Contract Intelligence & Analysis | JMC LEX',
    description: 'Advanced contract intelligence, analysis, and management solutions for multinational corporations and legal teams.',
    keywords: [
      'contract intelligence',
      'contract analysis',
      'contract management',
      'legal technology',
      'contract automation',
      'risk management',
    ],
    ogType: 'website' as const,
  },
  executiveInternationalContracts: {
    title: 'Executive International Contracts | Cross-Border Agreements | JMC LEX',
    description: 'Specialized expertise in complex international contracts, executive agreements, and cross-border commercial arrangements.',
    keywords: [
      'international contracts',
      'executive agreements',
      'cross-border contracts',
      'commercial agreements',
      'contract negotiation',
      'international business law',
    ],
    ogType: 'website' as const,
  },
  training: {
    title: 'Executive Legal Training Programs | JMC LEX',
    description: 'Premium executive training programs in international law, compliance, and strategic legal management for corporate professionals.',
    keywords: [
      'legal training',
      'executive training',
      'compliance training',
      'international law training',
      'professional development',
      'legal education',
    ],
    ogType: 'website' as const,
  },
  executiveTrainingCenter: {
    title: 'Executive Training Center | Legal Education Programs | JMC LEX',
    description: 'Comprehensive executive training center offering specialized programs in international law, compliance, and strategic legal management.',
    keywords: [
      'executive training center',
      'legal education',
      'compliance programs',
      'international law courses',
      'professional certification',
      'legal training programs',
    ],
    ogType: 'website' as const,
  },
  jurisprudence: {
    title: 'Jurisprudence Database | Legal Research & Case Law | JMC LEX',
    description: 'Comprehensive jurisprudence database with curated case law, legal precedents, and research materials for international law.',
    keywords: [
      'jurisprudence database',
      'case law',
      'legal research',
      'legal precedents',
      'international law database',
      'legal research tools',
    ],
    ogType: 'website' as const,
  },
  globalPresence: {
    title: 'Global Presence & Office Locations | JMC LEX',
    description: 'JMC LEX international offices across EMEA providing local expertise and global perspective on cross-border legal matters.',
    keywords: [
      'global presence',
      'office locations',
      'international offices',
      'EMEA legal services',
      'local expertise',
      'international legal network',
    ],
    ogType: 'website' as const,
  },
  about: {
    title: 'About JMC LEX | International Legal Advisory Firm',
    description: 'Learn about JMC LEX, a leading international legal advisory firm specializing in cross-border compliance and strategic counsel for multinational corporations.',
    keywords: [
      'about JMC LEX',
      'legal firm',
      'international legal advisory',
      'company profile',
      'legal expertise',
      'firm history',
    ],
    ogType: 'website' as const,
  },
  talentNetwork: {
    title: 'Talent Network | Legal Experts & Specialists | JMC LEX',
    description: 'Join our international talent network of legal experts, consultants, and specialists in cross-border advisory and compliance.',
    keywords: [
      'talent network',
      'legal experts',
      'consultants',
      'legal specialists',
      'expert network',
      'professional network',
    ],
    ogType: 'website' as const,
  },
  privacy: {
    title: 'Privacy Policy | JMC LEX',
    description: 'Privacy policy and data protection information for JMC LEX website and services.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'privacy'],
    ogType: 'website' as const,
    noindex: true,
  },
  terms: {
    title: 'Terms of Service | JMC LEX',
    description: 'Terms of service and legal terms for JMC LEX website and services.',
    keywords: ['terms of service', 'legal terms', 'terms and conditions'],
    ogType: 'website' as const,
    noindex: true,
  },
  disclaimer: {
    title: 'Disclaimer | JMC LEX',
    description: 'Legal disclaimer for JMC LEX website and services.',
    keywords: ['disclaimer', 'legal disclaimer'],
    ogType: 'website' as const,
    noindex: true,
  },
} as const;
