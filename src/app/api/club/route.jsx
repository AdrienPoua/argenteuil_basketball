// src/app/api/proxy/route.js
import { NextResponse } from 'next/server';

const CLUB_API_URL = 'https://v1.scorenco.com/backend/v1/clubs/sport/basket/club/argenteuil-bb/';

async function fetchClubData(apiUrl) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch club data, HTTP status: ${response.status}`);
  }
  return response.json();
}

export async function GET() {
  try {
    const clubData = await fetchClubData(CLUB_API_URL);
    return NextResponse.json(clubData);
  } catch (error) {
    console.error('Error fetching club data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
