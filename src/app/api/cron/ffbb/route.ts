import { validateUser } from '@/lib/api/validateUser';
import { NextResponse } from 'next/server';

// Cette fonction sera exécutée lorsque la route est appelée
export async function GET() {
  try {
    // Récupération du token (similaire à ce qui est fait dans la page)
    await validateUser();

    return NextResponse.json({ success: true, message: 'Clubs et matchs mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour automatique des données FFBB:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la mise à jour des données' }, { status: 500 });
  }
}
