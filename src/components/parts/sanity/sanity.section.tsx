import { SanityDocument } from 'next-sanity'
import { getHomePost } from '@/core/presentation/actions/sanity/getHomePost'
import { use } from 'react'
import { AnimatedCard } from './sanity.card.animated'
import { SanityCard } from './sanity.card'

export default function PostsWrapper() {
  const MAX_POSTS_ON_HOME_PAGE = 4
  const { main, secondary, posts } = use(getHomePost())

  if (!main || !secondary || !posts) {
    return <NoPosts />
  }

  return (
    <div className="container mx-auto mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:px-24">
      <div className="top-32 aspect-[9/10] w-full md:sticky">
        <AnimatedCard post={main} />
      </div>
      <div>
        <div className="mb-8 aspect-[9/10]">
          <AnimatedCard post={secondary} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.slice(0, MAX_POSTS_ON_HOME_PAGE).map((post: SanityDocument) => (
            <AnimatedCard key={post._id} post={post} small />
          ))}
        </div>
      </div>
    </div>
  )
}

const NoPosts = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <h1>Aucun post trouvé</h1>
    </div>
  )
}
