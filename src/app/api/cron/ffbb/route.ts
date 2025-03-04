import { updateClubs, updateMatchs } from '@/app/(logged-in)/dashboard/ffbb/actions/server.actions';
import { NextResponse } from 'next/server';

// Cette fonction sera exécutée lorsque la route est appelée
export async function GET() {
  try {
    // Récupération du token (similaire à ce qui est fait dans la page)
    const token = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ffbb/token`);


    return NextResponse.json({ success: true, message: 'Clubs et matchs mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour automatique des données FFBB:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la mise à jour des données' }, { status: 500 });
  }
}
