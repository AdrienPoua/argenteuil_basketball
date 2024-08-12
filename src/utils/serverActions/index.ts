"use server";
import { APIClubType, CompetitionType } from "@/utils/types";



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
