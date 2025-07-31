import { ReactElement } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../../../core/infrastructure/sanity/image'
import { cn } from '@/utils/cn'
import { SanityDocument } from 'next-sanity'

interface PropsType {
  post: SanityDocument
  small?: boolean
}

export function SanityCard({ post, small }: Readonly<PropsType>): ReactElement {
  const { Image: postImage, title, publishedAt: date, slug } = post
  const formatedDate = new Date(date).toLocaleDateString('fr-FR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link href={`/actualites/${slug.current}`} className="group flex size-full">
      <Card
        className={cn(
          'flex size-full grow flex-col overflow-hidden rounded-3xl border-none',
          'group:hover:border-2 group:hover:border-primary',
        )}
      >
        <CardContent
          className={`relative h-full grow overflow-hidden p-0 ${small ? 'hidden md:block' : ''} `}
        >
          <Image
            src={urlFor(postImage).url()}
            alt={title}
            width={1000}
            height={1000}
            className="h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </CardContent>
        <CardFooter className="mt-3 flex flex-col items-start">
          <h2 className="text-xl text-black">{title}</h2>
          <p className="text-background">{formatedDate}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
