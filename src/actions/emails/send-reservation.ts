'use server';

import Match from '@/models/Match';
import { ReservationService } from '@/integrations/nodemailer/services/reservation';
import { revalidatePath } from 'next/cache';

type PropsType = ReturnType<Match['toPlainObject']>;

export async function sendMatchesEmail(matches: PropsType[]) {
  try {
    const reservationService = new ReservationService(matches);
    const result = await reservationService.send();
    // Revalidate the path to refresh the UI
    revalidatePath('/dashboard/reservations');

    return { success: !!result, message: result ? 'Email envoyé avec succès' : "Erreur lors de l'envoi de l'email" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de réservation:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi de l'email",
    };
  }
}
