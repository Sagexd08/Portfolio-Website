import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Portfolio',
  description = 'Personal portfolio showcasing projects, skills, and experience.',
  canonical,
  ogImage = '/images/profile.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
}) => {
  // Format the title with site name
  const formattedTitle = `${title} | Portfolio`;
  
  // Base URL for canonical and OG image
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.example.com';
  
  // Full canonical URL
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  // Full OG image URL
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots Meta */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="application-name" content="Portfolio" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Portfolio" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Head>
  );
};

export default SEO;
