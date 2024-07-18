import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Argenteuil Basketball | Site officiel du club de basket d&apos;Argenteuil</title>
        <meta
          name="keywords"
          content="argenteuil, basketball, club"
        />
        <meta
          name="description"
          content="Site officiel du club de basket d'Argenteuil. Vous trouverez ici les dernières actualités et informations relatives au club"
        />
        <meta
          name="author"
          content="Argenteuil Basketball"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Argenteuil Basketball"
        />
        <meta
          property="og:description"
          content="Site officiel du club de basket d'Argenteuil."
        />
        <meta
          property="og:image"
          content="https://argenteuilbasketball.com/images/logo.png"
        />
        <meta
          property="og:url"
          content="https://argenteuilbasketball.com"
        />

        {/* Twitter Cards */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          content="Argenteuil Basketball"
        />
        <meta
          name="twitter:description"
          content="Site officiel du club de basket d'Argenteuil."
        />
        <meta
          name="twitter:image"
          content="/images/logo.png"
        />

        {/* Canonical Link */}
        <link
          rel="canonical"
          href="https://argenteuilbasketball.com"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="/images/logo.png"
        />
      </head>
      <GoogleAnalytics gaId="G-M6VWBLM3QV" />
      <body className="flex flex-col font-main min-h-screen">{children}</body>
    </html>
  );
}
