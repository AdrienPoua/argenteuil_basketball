// src/app/api/proxy/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = 'https://v1.scorenco.com/backend/v1/clubs/sport/basket/club/argenteuil-bb/?gtbl=1&exclude=sponsors';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
