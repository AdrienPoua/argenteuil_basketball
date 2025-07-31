import { sanityFetch } from '@/core/infrastructure/sanity/fetch'
import {
  POST_HOME_LEFT_QUERY,
  POST_HOME_RIGHT_QUERY,
  POSTS_CLASSIC_QUERY,
} from '@/core/infrastructure/sanity/queries'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'
import { SanityDocument } from 'next-sanity'

export async function getHomePost() {
  try {
    // Récupération des posts pour la page d'accueil en parallèle
    const [main, secondary, posts] = await Promise.all([
      sanityFetch({ query: POST_HOME_LEFT_QUERY }),
      sanityFetch({ query: POST_HOME_RIGHT_QUERY }),
      sanityFetch({ query: POSTS_CLASSIC_QUERY }),
    ])

    return {
      main: main as SanityDocument,
      secondary: secondary as SanityDocument,
      posts: posts as SanityDocument[],
    }
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
