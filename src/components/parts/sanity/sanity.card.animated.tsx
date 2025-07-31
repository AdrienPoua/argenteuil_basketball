import { SanityCard } from './sanity.card'
import { SanityDocument } from 'next-sanity'
import ScaleFromBottom from '@/components/motion/ScaleFromBottom'

interface PropsType {
  post: SanityDocument
  small?: boolean
}

export function AnimatedCard({ post, small }: Readonly<PropsType>) {
  return (
    <ScaleFromBottom className={`group flex size-full ${small ? 'max-h-[30rem]' : ''}`}>
      <SanityCard post={post} small={small} />
    </ScaleFromBottom>
  )
}
