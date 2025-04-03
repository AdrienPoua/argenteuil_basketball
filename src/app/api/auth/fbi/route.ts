import { NextResponse } from 'next/server';
import { getToken } from '@/actions/fetchs/fbi/getToken';
import { authApi } from '@/lib/hoc/authApi';

export async function GET() {
  try {
    // Vérifier que l'utilisateur est authentifié dans notre application

    // Tenter d'obtenir le token FBI
    const token = await getToken();
    console.log('🚀 ~ GET ~ token:', token);
  } catch (error) {
    console.error("Erreur lors de l'authentification FBI:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'authentification au FBI",
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 },
    );
  }
}

// Cette route ne devrait pas être accessible via POST, PUT, etc.
export async function POST() {
  return NextResponse.json({ success: false, message: 'Méthode non autorisée' }, { status: 405 });
}
