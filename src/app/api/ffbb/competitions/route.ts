import { NextResponse } from 'next/server';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';
import { errorHandler } from '@/lib/utils/handleApiError';
import { authApi } from '@/lib/hoc/authApi';

// Cette route sert de proxy pour contourner les restrictions CORS
export async function GET(request: Request) {
  try {
    // Option : Vérifier l'authentification (décommenter si nécessaire)
    // await authApi();
    
    // Récupérer le token d'authentification FFBB (si nécessaire)
    // Si vous avez un mécanisme pour obtenir/stocker le token FFBB, utilisez-le ici
    const token = request.headers.get('x-ffbb-token') || '';
    
    // Appel à l'API FFBB depuis le serveur (pas de restrictions CORS côté serveur)
    const response = await fetch(API_ENDPOINTS_FFBB.COMPETITIONS, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Utiliser le gestionnaire d'erreur existant
      return NextResponse.json(
        { 
          success: false, 
          message: 'Erreur lors de la récupération des compétitions',
          status: response.status,
          statusText: response.statusText
        }, 
        { status: response.status }
      );
    }
    
    // Récupérer et transformer les données comme dans la fonction originale
    const data = await response.json();
    const competitions = data.map((compet: any) => ({ 
      id: compet.id, 
      label: compet.nom 
    }));
    
    // Renvoyer les données au client
    return NextResponse.json({ 
      success: true, 
      data: competitions 
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des compétitions:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de la récupération des compétitions',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }, 
      { status: 500 }
    );
  }
} 