import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajustez le chemin selon votre configuration
import { getServerSession } from 'next-auth/next'; // Si vous utilisez NextAuth
import { authOptions } from '@/integrations/nextAuth/auth';
import { validateUser } from '@/lib/api/validateUser';

// GET /api/tasks - Récupérer toutes les tâches de l'utilisateur connecté
export async function GET() {
  try {
    await validateUser();

    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/tasks - Créer une nouvelle tâche
export async function POST(req: NextRequest) {
  try {
    await validateUser();

    const { title } = await req.json();

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'Titre de tâche invalide' }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
