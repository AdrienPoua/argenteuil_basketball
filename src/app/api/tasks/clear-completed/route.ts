import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajustez le chemin selon votre configuration
import { validateUser } from '@/lib/api/validateUser';

// DELETE /api/tasks/clear-completed - Supprimer toutes les tâches terminées
export async function DELETE() {
  try {
    await validateUser();

    await prisma.task.deleteMany({
      where: {
        done: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression des tâches terminées:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
