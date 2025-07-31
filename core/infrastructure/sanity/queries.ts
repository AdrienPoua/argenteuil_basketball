// ./sanity/lib/queries.ts

import { groq } from 'next-sanity'

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`

export const POST_QUERY = (slug: string) => groq`*[_type == "post" && slug.current == "${slug}"][0]`

export const POST_HOME_LEFT_QUERY = groq`*[_type == "post" && type == "homeLeft"][0]`
export const POST_HOME_RIGHT_QUERY = groq`*[_type == "post" && type == "homeRight"][0]`
export const POSTS_CLASSIC_QUERY = groq`*[_type == "post" && type == "classic"] | order(publishedAt desc)`
