interface SanityErrorProps {
  details?: any
  message: string
  response?: any
  responseBody?: any
  statusCode?: number
}

export function isSanityError(error: unknown): error is SanityErrorProps {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as SanityErrorProps).message === 'string' &&
    // Vérification optionnelle des autres propriétés spécifiques à Sanity
    ('statusCode' in error || 'response' in error || 'responseBody' in error)
  )
}
