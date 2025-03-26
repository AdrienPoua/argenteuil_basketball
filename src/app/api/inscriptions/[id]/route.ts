import { NextResponse } from 'next/server';
import InscriptionService from '@/services/Inscriptions';
import { InscriptionSchema } from '@/lib/validation/Inscription';
import { validateUser } from '@/lib/api/validateUser';
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const inscription = await InscriptionService.findById(params.id);

    if (!inscription) {
      return NextResponse.json({ error: 'Inscription non trouvée' }, { status: 404 });
    }

    return NextResponse.json(inscription);
  } catch (error) {
    console.error('Error fetching inscription:', error);
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Vérifie si l'utilisateur est authentifié
    await validateUser();

    const body = await request.json();
    const validatedData = InscriptionSchema.parse(body);
    const inscription = await InscriptionService.findById(params.id);
    // Si l'inscription n'existe pas, renvoie une erreur 404
    if (!inscription) {
      return NextResponse.json({ error: 'Inscription non trouvée' }, { status: 404 });
    }
    // Met à jour l'inscription avec les données validées
    await InscriptionService.update(params.id, validatedData);

    // Renvoie la réponse avec l'inscription mise à jour
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error updating inscription:', error);
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 });
  }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Vérifie si l'utilisateur est authentifié
    await validateUser();

    const inscription = await InscriptionService.findById(params.id);
    // Si l'inscription n'existe pas, renvoie une erreur 404
    if (!inscription) {
      return NextResponse.json({ error: 'Inscription non trouvée' }, { status: 404 });
    }
    await InscriptionService.delete(params.id);
    return NextResponse.json({ message: 'Inscription supprimée avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting inscription:', error);
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 });
  }
}
