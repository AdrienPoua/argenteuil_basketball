import { PortableTextComponents } from "@portabletext/react"
import { urlFor } from "@/services/sanity/image"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8 w-full ">
        <div className="relative w-full overflow-hidden rounded-lg">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ""}
            className="object-cover transition-transform duration-300 ease-in-out hover:scale-105 mx-auto"
            width={500}
            height={500}
          />
        </div>
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-background">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Button asChild variant="link" className="p-0 h-auto font-normal">
        <Link
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
        >
          {children}
          <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </Button>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className={cn(
        "mt-12 mb-4 text-4xl font-extrabold tracking-tight",
        "scroll-m-20 lg:text-5xl",
        "text-black"
      )}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className={cn(
        "mt-10 mb-4 text-3xl font-semibold tracking-tight",
        "scroll-m-20 border-b pb-2 first:mt-0",
        "text-black"

      )}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={cn(
        "mt-8 mb-4 text-2xl font-semibold tracking-tight",
        "scroll-m-20"
      )}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className={cn(
        "mt-6 mb-4 text-xl font-semibold tracking-tight",
        "scroll-m-20"
      )}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-7 font-secondary text-background [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-primary pl-6 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-primary font-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

