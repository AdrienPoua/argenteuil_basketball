import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajustez le chemin selon votre configuration
import { validateUser } from '@/lib/api/validateUser';

// PUT /api/tasks/[id] - Mettre à jour une tâche
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await validateUser();
    const taskId = params.id;
    const { done } = await req.json();

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { done },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/tasks/[id] - Supprimer une tâche
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Vérifiez si la tâche appartient à l'utilisateur
  try {
    await validateUser();

    const taskId = params.id;
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return NextResponse.json({ error: 'Tâche non trouvée' }, { status: 404 });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
