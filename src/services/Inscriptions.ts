import prisma from '@/database/prisma';
import { StatutInscription } from '@prisma/client';
import { InscriptionSchema } from '@/lib/validation/Inscription';
import { z } from 'zod';

class InscriptionService {
  // Créer une nouvelle inscription
  async create(data: z.infer<typeof InscriptionSchema>) {
    console.log('🚀 ~ InscriptionService ~ create ~ data:', data);
    try {
      return await prisma.inscription.create({
        data: {
          ...data,
          dateNaissance: new Date(data.dateNaissance),
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'inscription :", error);
      throw error;
    }
  }

  // Récupérer toutes les inscriptions avec pagination et filtres optionnels
  async getAll() {
    try {
     return await prisma.inscription.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions :', error);
      throw error;
    }
  }

  // Récupérer une inscription par son ID
  async findById(id: string) {
    try {
      return await prisma.inscription.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'inscription :", error);
      throw error;
    }
  }

  // Mettre à jour une inscription
  async update(id: string, data: z.infer<typeof InscriptionSchema>) {
    try {
      return await prisma.inscription.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'inscription :", error);
      throw error;
    }
  }

  // Supprimer une inscription
  async delete(id: string) {
    try {
      return await prisma.inscription.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'inscription :", error);
      throw error;
    }
  }

  // Compter les inscriptions par statut
  async countByStatus() {
    try {
      const counts = await prisma.inscription.groupBy({
        by: ['statut'],
        _count: {
          _all: true,
        },
      });

      // Initialiser toutes les valeurs possibles à 0
      const result = Object.values(StatutInscription).reduce(
        (acc, status) => {
          acc[status] = 0;
          return acc;
        },
        {} as Record<StatutInscription, number>,
      );

      // Mettre à jour avec les valeurs réelles
      counts.forEach((count) => {
        result[count.statut as StatutInscription] = count._count._all;
      });

      return result;
    } catch (error) {
      console.error('Erreur lors du comptage des inscriptions par statut :', error);
      throw error;
    }
  }
}

const inscriptionService = new InscriptionService();
export default inscriptionService;
