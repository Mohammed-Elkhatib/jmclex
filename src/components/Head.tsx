import { MetadataConfig, GLOBAL_METADATA, getOrganizationSchema } from '@/lib/metadata';

interface HeadProps {
  metadata?: Partial<MetadataConfig>;
}

export const Head = ({ metadata }: HeadProps) => {
  const config: MetadataConfig = {
    title: metadata?.title || GLOBAL_METADATA.siteName,
    description: metadata?.description || GLOBAL_METADATA.description,
    keywords: metadata?.keywords || GLOBAL_METADATA.keywords,
    ogImage: metadata?.ogImage || GLOBAL_METADATA.defaultOgImage,
    ogType: metadata?.ogType || 'website',
    canonicalUrl: metadata?.canonicalUrl || GLOBAL_METADATA.siteUrl,
    hreflang: metadata?.hreflang,
    structuredData: metadata?.structuredData,
    noindex: metadata?.noindex || false,
  };

  const fullTitle = config.title.includes('|') ? config.title : `${config.title} | ${GLOBAL_METADATA.siteName}`;

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      
      {/* Title & Description */}
      <title>{fullTitle}</title>
      <meta name="description" content={config.description} />
      {config.keywords && <meta name="keywords" content={config.keywords.join(', ')} />}
      
      {/* SEO & Authority Signals */}
      <meta name="author" content={GLOBAL_METADATA.author} />
      <meta name="robots" content={config.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="language" content={GLOBAL_METADATA.language} />
      <meta name="revisit-after" content="7 days" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph for Social Sharing */}
      <meta property="og:type" content={config.ogType} />
      <meta property="og:site_name" content={GLOBAL_METADATA.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content={config.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={config.canonicalUrl} />
      <meta property="og:locale" content={GLOBAL_METADATA.locale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={GLOBAL_METADATA.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={config.ogImage} />
      
      {/* Canonical & Hreflang for International SEO */}
      <link rel="canonical" href={config.canonicalUrl} />
      {config.hreflang && config.hreflang.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={alt.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={GLOBAL_METADATA.siteUrl} />
      
      {/* Multilingual hreflang tags for all supported languages */}
      <link rel="alternate" hrefLang="en" href={config.canonicalUrl} />
      <link rel="alternate" hrefLang="fr" href={`${config.canonicalUrl}?lang=fr`} />
      <link rel="alternate" hrefLang="ar" href={`${config.canonicalUrl}?lang=ar`} />
      <link rel="alternate" hrefLang="zh" href={`${config.canonicalUrl}?lang=zh`} />
      
      {/* Structured Data - Organization Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }} />
      
      {/* Page-specific Structured Data */}
      {config.structuredData && (
        <>
          {/* Handle multiple schemas */}
          {Array.isArray(config.structuredData) ? (
            config.structuredData.map((schema, index) => (
              <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))
          ) : (
            // Handle object with multiple schema properties
            Object.entries(config.structuredData).map(([key, schema]) => (
              schema && (
                <script key={key} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
              )
            ))
          )}
        </>
      )}
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="https://static.wixstatic.com" />
    </>
  );
};
