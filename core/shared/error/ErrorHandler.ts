import { AppError } from './AppError';
import { isAuthError } from './typeguards/isAuthError';
import { isContentfulError } from './typeguards/isContentfulError';
import { isHttpError } from './typeguards/isHttpError';
import { isSupabaseError } from './typeguards/isSupabaseError';
import { isZodError } from './typeguards/isZodError';

export class ErrorHandler {
  /**
   * Log formaté, prêt pour file/monitoring/externe.
   */
  static log(error: unknown) {
    if (error instanceof AppError) {
      console.error(`[${error.type}] ${error.message}`, {
        statusCode: error.statusCode,
        details: error.details,
        stack: error.stack,
        originalError: error.originalError,
      });
    } else if (error instanceof Error) {
      console.error(`[JS-ERROR] ${error.name}: ${error.message}`, {
        stack: error.stack,
      });
    } else {
      console.error(`[NON-ERROR-THROWN]`, error);
    }
    // Ajoute intégration monitoring ici au besoin (Sentry, Datadog…)
  }

  /**
   * Message user-friendly (jamais de stack/technique).
   */
  static userMessage(error: unknown): string {
    if (error instanceof AppError) {
      switch (error.type) {
        case 'NETWORK':
          return 'Problème réseau : vérifiez votre connexion Internet.';
        case 'API':
          return 'Erreur côté serveur. Réessayez plus tard.';
        case 'VALIDATION':
          return 'Certains champs ne sont pas valides, vérifiez votre saisie !';
        case 'AUTH':
          return 'Vous n’êtes pas autorisé à faire cette action.';
        case 'SUPABASE':
          return 'Une erreur interne liée à Supabase est survenue.';
        case 'CONTENTFUL':
          return 'Erreur liée au contenu ; notre équipe est sur le coup !';
        case 'UNKNOWN':
        default:
          return 'Erreur inconnue. Merci de rééssayer plus tard.';
      }
    }
    return 'Une anomalie interne est survenue.';
  }

  /**
   * Normalise toute erreur reçue avec signature et détails,
   */
  static normalize(error: unknown): AppError {
    // Already normalized
    if (error instanceof AppError) return error;

    // Validation (ex : Zod)
    if (isZodError(error)) {
      return new AppError({
        message: 'Erreur de parsing de données via Zod.',
        type: 'VALIDATION',
        originalError: error,
        details: error.issues,
      });
    }

    // Supabase
    if (isSupabaseError(error)) {
      return new AppError({
        message: error.error.message || 'Erreur inconnue depuis Supabase.',
        type: 'SUPABASE',
        statusCode: typeof error.status === 'number' ? error.status : undefined,
        originalError: error,
        details: error.error.details,
      });
    }

    // Contentful
    if (isContentfulError(error)) {
      return new AppError({
        message: error.message,
        type: 'CONTENTFUL',
        statusCode: typeof error.status === 'number' ? error.status : undefined,
        originalError: error,
        details: error.details,
      });
    }

    // API Network/fetch/http
    if (isHttpError(error)) {
      return new AppError({
        message: error.statusText,
        type: 'API',
        statusCode: error.status,
        originalError: error,
        details: error,
      });
    }

    // Authentification
    if (isAuthError(error)) {
      const err = error as { message?: string; status?: number };
      return new AppError({
        message: err.message ?? 'Authentification requise',
        type: 'AUTH',
        statusCode: err.status ?? 401,
        originalError: error,
      });
    }

    // Autres erreurs JS
    if (error instanceof Error) {
      return new AppError({
        message: error.message,
        type: 'UNKNOWN',
        originalError: error,
        details: error.stack,
      });
    }

    // Inconnu (throw string, objet, etc.)
    return new AppError({
      message: 'Erreur non catégorisée par le système.',
      type: 'UNKNOWN',
      originalError: error,
      details: error,
    });
  }
}
