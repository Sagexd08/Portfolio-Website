import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Sohom Chatterjee - AI/ML Developer Portfolio - Showcasing expertise in artificial intelligence and machine learning" />
        <meta name="keywords" content="Sohom Chatterjee, AI, ML, developer, portfolio, machine learning, artificial intelligence" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sohom-chatterjee.vercel.app/" />
        <meta property="og:title" content="Sohom Chatterjee | AI/ML Developer Portfolio" />
        <meta property="og:description" content="Sohom Chatterjee's portfolio showcasing expertise in artificial intelligence and machine learning" />
        <meta property="og:image" content="/images/profile.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sohom-chatterjee.vercel.app/" />
        <meta property="twitter:title" content="Sohom Chatterjee | AI/ML Developer Portfolio" />
        <meta property="twitter:description" content="Sohom Chatterjee's portfolio showcasing expertise in artificial intelligence and machine learning" />
        <meta property="twitter:image" content="/images/profile.jpg" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-dark text-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}