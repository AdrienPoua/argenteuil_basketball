import { NextRequest, NextResponse } from 'next/server';
import { validateUser } from '@/lib/api/validateUser';
import DocumentService from '@/services/Document';
import { errorHandler } from '@/lib/utils/handleApiError';
interface Params {
  params: {
    id: string;
  };
}

// GET pour récupérer un document spécifique (métadonnées uniquement)
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const document = await DocumentService.getDocumentById(params.id);
    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 404 },
    );
  }
}

// PUT pour mettre à jour un document
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    // Vérifier si l'utilisateur est authentifié
    await validateUser();

    // Utiliser FormData pour prendre en charge une mise à jour potentielle du fichier
    const formData = await req.formData();

    // Récupérer les champs du formulaire
    const title = formData.get('title') as string;
    const file = formData.get('file') as File | null;

    // Préparation des données à mettre à jour
    const updateData: any = {};

    if (title) {
      updateData.title = title;
    }

    if (file) {
      // Si un nouveau fichier est fourni, mettre à jour toutes les informations liées au fichier
      const fileContent = await file.arrayBuffer();
      updateData.fileName = file.name;
      updateData.fileContent = Buffer.from(fileContent);
      updateData.mimeType = file.type;
      updateData.fileSize = file.size;
    }

    // Vérifier qu'au moins un champ est à mettre à jour
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Au moins un champ à mettre à jour est requis' }, { status: 400 });
    }

    // Mettre à jour le document
    const document = await DocumentService.updateDocument(params.id, updateData);

    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

// DELETE pour supprimer un document
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    // Vérifier si l'utilisateur est authentifié
    await validateUser();

    // Supprimer le document
    await DocumentService.deleteDocument(params.id);

    return NextResponse.json({ message: 'Document supprimé avec succès' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
