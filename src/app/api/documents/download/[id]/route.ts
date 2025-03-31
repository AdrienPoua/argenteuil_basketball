import { NextRequest, NextResponse } from 'next/server';
import DocumentService from '@/services/Document';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    // Récupération du document avec son contenu
    const document = await DocumentService.getDocumentById(params.id, true);
    
    if (!document || !document.fileContent) {
      return NextResponse.json(
        { error: 'Document not found or has no content' },
        { status: 404 }
      );
    }
    
    // Création d'une réponse avec le contenu du fichier
    const response = new NextResponse(document.fileContent);
    
    // Configuration des en-têtes pour le téléchargement avec valeurs par défaut si nécessaire
    response.headers.set('Content-Type', document.mimeType || 'application/octet-stream');
    response.headers.set('Content-Disposition', `attachment; filename="${document.fileName || 'document.pdf'}"`);
    response.headers.set('Content-Length', String(document.fileSize || 0));
    
    return response;
  } catch (error) {
    console.error('Error downloading document:', error);
    return NextResponse.json(
      { error: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 