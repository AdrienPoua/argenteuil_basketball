import { Button } from '@/components/ui/button';
import { CloudDownload } from 'lucide-react';
import MainSection from '@/components/layouts/MainSection';
import H2 from '@/components/ui/h2';
import DocumentService from '@/services/Document';
import Document from '@/models/Document';

export const metadata = {
  title: 'Documents utiles | Argenteuil Basketball',
  description: "Téléchargez tous les documents utiles pour le club de basket d'Argenteuil.",
  openGraph: {
    title: 'Documents utiles - Argenteuil Basketball',
    description: "Téléchargez tous les documents utiles pour le club de basket d'Argenteuil.",
  },
};

function formatFileSize(bytes: number = 0): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

// Récupération des documents depuis la base de données
// et conversion en objets Document avec les valeurs par défaut
export default async function DocumentsPage() {
  const documents = await DocumentService.getDocuments().then((docs) =>
    docs.map((doc) => {
      // Convertir les valeurs null en undefined pour compatibilité avec le type Partial<Document>
      const cleanDoc = Object.fromEntries(
        Object.entries(doc).map(([key, value]) => [key, value === null ? undefined : value]),
      );
      return new Document(cleanDoc);
    }),
  );

  return (
    <MainSection>
      <H2>Documents</H2>
      <div className='m-auto flex w-fit flex-col items-center justify-center gap-5'>
        {documents.length === 0 ? (
          <p className='text-center text-muted-foreground'>Aucun document disponible pour le moment.</p>
        ) : (
          documents.map((document) => (
            <Button key={document.id} className='w-full'>
              <a
                href={`/api/documents/download/${document.id}`}
                download
                className='flex w-full items-center justify-between gap-2'
              >
                <span>{document.title}</span>
                <div className='flex items-center gap-2'>
                  <CloudDownload className='h-5 w-5' />
                </div>
              </a>
            </Button>
          ))
        )}
      </div>
    </MainSection>
  );
}
