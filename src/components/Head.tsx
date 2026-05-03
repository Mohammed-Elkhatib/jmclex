import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  robots?: string;
  author?: string;
}

export const Head = ({
  title = 'International Legal Advisory & Cross-Border Strategy | JMCLEX',
  description = 'Premier international law firm specializing in cross-border legal strategy, corporate law, litigation, and compliance. Expert counsel for complex multi-jurisdictional matters.',
  keywords = 'international law, cross-border legal services, corporate law, litigation, legal advisory, compliance, international contracts',
  ogTitle,
  ogDescription,
  ogImage = 'https://static.wixstatic.com/media/5e1235_f4bf3179ebc94b02bd944a19cf135d4b~mv2.png',
  ogUrl,
  canonical,
  robots = 'index, follow',
  author = 'JMC LEGAL'
}: SEOProps) => {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      
      <title>{title}</title>
    </Helmet>
  );
};
