import type { Metadata } from 'next';
import H1 from '@/components/ui/H1';
import { readDocuments } from '@/core//presentation/actions/documents/read';
import club from '@/core/shared/config/club';
import Card from './page.card';

export const metadata: Metadata = {
  title: 'Documents du club',
  description:
    "Téléchargez les documents officiels du club de basket d'Argenteuil : règlements, formulaires d'inscription, certificats médicaux et documents administratifs.",
  keywords: [
    'documents club basket',
    'règlement club basket',
    'formulaire inscription',
    'certificat médical',
    'documents officiels',
    'téléchargement documents',
    'paperasse club',
    'administratif basket',
  ],
  openGraph: {
    title: `Documents du club - ${club.name}`,
    description:
      "Téléchargez les documents officiels du club de basket d'Argenteuil : règlements, formulaires et documents administratifs.",
    url: `https://${club.domain}/documents`,
    images: [
      {
        url: `https://${club.domain}${club.logo}`,
        width: 1200,
        height: 630,
        alt: 'Documents BC Sartrouville',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Documents du club - ${club.name}`,
    description:
      "Téléchargez les documents officiels du club de basket d'Argenteuil : règlements, formulaires et documents administratifs.",
    images: [`https://${club.domain}${club.logo}`],
  },
  alternates: {
    canonical: `https://${club.domain}/documents`,
  },
};

export default async function DocumentsPublicPage() {
  const documents = await readDocuments().then((doc) => doc.map((doc) => doc.toObject()));
  return (
    <div>
      <H1>Les documents</H1>
      <div className='mx-auto grid grid-cols-1 gap-4 px-5 md:grid-cols-2'>
        {documents.map((document) => (
          <Card key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
}
