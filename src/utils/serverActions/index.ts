"use server";
import { transporter, clubEmail } from "@/lib/nodemailer";
import { APIClubType, CompetitionType } from "@/utils/types";

export const sendEmail = async (to: string, subject: string, text: string, cc?: string) => {
  try {
    await transporter.sendMail({
      from: clubEmail,
      bcc: to,
      subject,
      text,
    });
    return { success: true, message: "Email envoyé avec succès" };
  } catch (error) {
    return { success: false, message: "Erreur lors de l'envoi de l'email", error };
  } finally {
    transporter.close();
  }
};

export const getClubDataFromApi = async (): Promise<APIClubType> => {
  const endpoint = "https://v1.scorenco.com/backend/v1/clubs/sport/basket/club/argenteuil-bb/";
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    throw new Error();
  }
};
export const getRankingDataFromApi = async (id: string): Promise<CompetitionType> => {
  const endpoint = `https://v1.scorenco.com/backend/v1/competitions/${id}/rankings/`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    throw new Error();
  }
};
