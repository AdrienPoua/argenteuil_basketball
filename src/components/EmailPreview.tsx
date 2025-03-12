'use client';

import { useEffect, useState } from 'react';
import Match from '@/models/Match';

interface EmailPreviewProps {
  matches?: any[];
}

export default function EmailPreview({ matches = [] }: EmailPreviewProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const fetchEmailPreview = async () => {
      try {
        const response = await fetch('/api/email-preview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ matches }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de l\'aperçu de l\'email');
        }

        const data = await response.json();
        setHtmlContent(data.html);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    if (matches && matches.length > 0) {
      fetchEmailPreview();
    }
  }, [matches]);

  return (
    <div className="h-full overflow-auto">
      {htmlContent ? (
        <iframe
          srcDoc={htmlContent}
          title="Aperçu de l'email"
          className="w-full h-full border-0"
          sandbox="allow-same-origin"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          {matches && matches.length > 0 
            ? "Chargement de l'aperçu..." 
            : "Aucun match à afficher"}
        </div>
      )}
    </div>
  );
} 