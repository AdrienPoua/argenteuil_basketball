// src/app/api/ranking/[id].js
import { NextResponse } from 'next/server';

const getRankingData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ranking data, HTTP status: ${response.status}`);
  }
  return response.json();
};

export async function GET(request, { params }) {
  const { id: competitionId } = params; // Extraction de l'ID de la compétition depuis les paramètres de la route
  const apiUrl = `https://v1.scorenco.com/backend/v1/competitions/${competitionId}/rankings/`;
  try {
    const rankingData = await getRankingData(apiUrl);
    return NextResponse.json(rankingData);
  } catch (error) {
    console.error('Error fetching ranking data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
