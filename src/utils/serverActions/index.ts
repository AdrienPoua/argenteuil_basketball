"use server";
import { transporter, clubEmail } from "@/lib/nodemailer";
import { APIClubType, CompetitionType } from "@/utils/types";
import { SentMessageInfo } from "nodemailer";

type SendEmailType = {
  to?: string;
  subject: string;
  text: string;
  bcc?: string;
  cc?: string;
};

export const sendEmail = async (payload: SendEmailType): Promise<SentMessageInfo> => {
  const { to, subject, text, bcc, cc } = payload;
  try {
    return await transporter.sendMail({
      from: clubEmail,
      subject,
      text,
      ...(cc && { cc }), // Inclure to seulement s'il est fourni
      ...(to && { to }), // Inclure to seulement s'il est fourni
      ...(bcc && { bcc }), // Inclure cci seulement s'il est fourni
    });
  } catch (error) {
    throw new Error("Erreur lors de l'envoi de l'email");
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
