import '@/styles/globals.css';
import Script from 'next/script';

import ClientLayout from './client.layout';
import { Viewport } from 'next';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='fr'>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Script type='application/ld+json' id='jsonld' dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      </body>
    </html>
  );
}

export const metadata = {
  title: "Argenteuil Basketball | Site officiel du club de basket d'Argenteuil",
  description:
    "Découvrez les dernières actualités, les résultats des matchs et les événements du club de basketball d'Argenteuil.",
  keywords: ['argenteuil', 'basketball', 'club', 'sport', 'match', 'compétition'],
  authors: [{ name: 'Adrien POUA', url: 'https://www.adrienpoua.fr' }],
  robots: 'index, follow',
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Argenteuil Basketball | Club officiel',
    description:
      "Rejoignez la communauté d'Argenteuil Basketball pour suivre les derniers résultats et événements du club.",
    url: 'https://argenteuilbasketball.com',
    siteName: 'Argenteuil Basketball',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://argenteuilbasketball.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Logo Argenteuil Basketball',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Argenteuil Basketball | Club officiel',
    description: "Suivez les dernières actualités et résultats du club de basket d'Argenteuil.",
    images: ['https://argenteuilbasketball.com/images/favicon.ico'],
  },
  alternates: {
    canonical: 'https://argenteuilbasketball.com',
  },
};

export const viewport: Viewport = {
  themeColor: '#1759E3',
  width: 'device-width',
  initialScale: 1,
};

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'SportsTeam',
  name: 'Argenteuil Basketball',
  url: 'https://argenteuilbasketball.com',
  logo: 'https://argenteuilbasketball.com/images/logo.png',
  description: "Club officiel de basketball d'Argenteuil. Suivez les équipes, les résultats et les événements du club.",
  sport: 'Basketball',
  memberOf: {
    '@type': 'SportsOrganization',
    name: 'Fédération Française de Basketball',
    url: 'https://www.ffbb.com/',
  },
  location: {
    '@type': 'SportsActivityLocation',
    name: 'Gymnase Jean Guimier',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2 rue jean de la fontaine',
      addressLocality: 'Argenteuil',
      postalCode: '95100',
      addressCountry: 'FR',
    },
  },
  sameAs: ['https://www.facebook.com/ABB95100/'],
};
