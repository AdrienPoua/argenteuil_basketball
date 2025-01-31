import './globals.css';
import ClientLayout from './ClientLayout';
import { Viewport } from 'next';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='fr'>
      <body>
        <ClientLayout>{children}</ClientLayout>
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
