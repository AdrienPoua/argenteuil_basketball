"use server";
export const getClubData = async () => {
  const endpoint = "https://v1.scorenco.com/backend/v1/clubs/sport/basket/club/argenteuil-bb/";
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch club data");
    }
    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while fetching club data");
  }
};

export const getRankingData = async (id: string) => {
  const endpoint = `https://v1.scorenco.com/backend/v1/competitions/${id}/rankings/`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch ranking data");
    }
    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while fetching ranking data");
  }
};
