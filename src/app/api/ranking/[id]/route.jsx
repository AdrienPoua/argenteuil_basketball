// src/app/api/ranking/[id].js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params; // Extraction de l'ID depuis les paramètres de la route
  const apiUrl = `https://v1.scorenco.com/backend/v1/competitions/${id}/rankings/`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
