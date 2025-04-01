import { NextRequest, NextResponse } from 'next/server';
import { validateUser } from '@/lib/api/validateUser';
import DocumentService from '@/services/Document';

// GET pour récupérer tous les documents
export async function GET() {
  try {
    const documents = await DocumentService.getDocuments();
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 },
    );
  }
}

// POST pour ajouter un document
export async function POST(req: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    await validateUser();

    // Utiliser FormData pour récupérer les données multipart
    const formData = await req.formData();

    // Récupérer les champs du formulaire
    const title = formData.get('title') as string;
    const file = formData.get('file') as File;

    if (!title || !file) {
      return NextResponse.json({ error: 'Le titre et le fichier sont requis' }, { status: 400 });
    }

    // Lire le contenu du fichier
    const fileContent = await file.arrayBuffer();

    // Créer l'entrée dans la base de données
    const document = await DocumentService.createDocument({
      title,
      fileName: file.name,
      fileContent: Buffer.from(fileContent),
      mimeType: file.type,
      fileSize: file.size,
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 },
    );
  }
}
