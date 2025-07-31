import { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '../../../../../core/infrastructure/sanity/image'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'
import { FileText, AlertTriangle, CheckCircle, Info, ExternalLink, X, ZoomIn } from 'lucide-react'
import { useState } from 'react'

// Composant ImageModal
const ImageModal = ({
  isOpen,
  onClose,
  imageUrl,
  alt,
  caption,
}: {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  alt: string
  caption?: string
}) => {
  if (!isOpen) return null

  return (
    <button
      className="fixed inset-0 z-50 flex w-full items-center justify-center border-0 bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      aria-label="Fermer l'image"
    >
      <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden">
        <Button
          className="absolute right-2 top-2 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Fermer"
          size="sm"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Image
            src={imageUrl}
            alt={alt || ''}
            className="max-h-[80vh] max-w-full object-contain"
            width={2000}
            height={1500}
          />

          {caption && (
            <div className="absolute bottom-0 w-full bg-black/60 p-3 text-center text-sm text-white">
              {caption}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

// Composant pour les images cliquables
const ClickableImage = ({ value }: { value: any }) => {
  const hasCaption = value.caption && value.caption.length > 0
  const [modalOpen, setModalOpen] = useState(false)
  const imageUrl = urlFor(value).width(1200).url()
  const fullImageUrl = urlFor(value).width(2000).url()

  return (
    <>
      <button
        type="button"
        className="group relative my-10 w-full cursor-zoom-in overflow-hidden rounded-lg border-0 bg-transparent p-0 text-left transition-all duration-300"
        onClick={() => setModalOpen(true)}
        title="Cliquez pour agrandir l'image"
        aria-label="Agrandir l'image"
      >
        <figure className="m-0">
          <div className="relative w-full overflow-hidden">
            {/* Utilisation d'une div avec position relative pour contenir l'image sans forcer de ratio */}
            <div className="relative w-full">
              <Image
                src={imageUrl}
                alt={value.alt || ''}
                className="mx-auto h-auto max-h-[800px] w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                height={800}
                width={1200}
              />

              {/* Overlay pour l'effet de zoom */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300">
                <div className="rounded-full bg-white/80 p-3 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-6 w-6 text-gray-800" />
                </div>
              </div>
            </div>
          </div>

          {hasCaption && (
            <figcaption className="bg-gray-50 p-3 text-center text-sm italic text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      </button>

      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={fullImageUrl}
        alt={value.alt || ''}
        caption={value.caption}
      />
    </>
  )
}

// Composant PortableText
export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <ClickableImage value={value} />,
    callout: ({ value }) => {
      const { icon = 'info', content } = value

      const icons = {
        info: <Info className="h-5 w-5 text-blue-500" />,
        warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <AlertTriangle className="h-5 w-5 text-red-500" />,
      }

      const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
      }

      return (
        <div
          className={`my-6 rounded-lg border-l-4 p-4 ${styles[icon as keyof typeof styles] || styles.info}`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 pt-0.5">
              {icons[icon as keyof typeof icons] || icons.info}
            </div>
            <div className="flex-1 font-secondary text-sm">{content}</div>
          </div>
        </div>
      )
    },
    code: ({ value }) => {
      const { language, code } = value

      return (
        <div className="my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
            <span className="text-xs font-medium text-gray-500">{language || 'Code'}</span>
            <FileText className="h-4 w-4 text-gray-400" />
          </div>
          <pre className="overflow-x-auto p-4 text-sm">
            <code className="font-mono text-sm text-gray-800">{code}</code>
          </pre>
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined

      return (
        <Link
          href={value.href}
          target={target}
          rel={rel}
          className="inline-flex items-center font-medium text-primary underline decoration-1 underline-offset-4 transition-colors hover:text-primary/80"
        >
          {children}
          {target === '_blank' && <ExternalLink className="ml-1 h-3 w-3" />}
        </Link>
      )
    },
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
    highlight: ({ children }) => (
      <span className="bg-yellow-100 px-1 text-yellow-800">{children}</span>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1
        className={cn(
          'mb-6 mt-12 text-4xl font-bold tracking-tight text-gray-900',
          'scroll-m-20 lg:text-5xl',
        )}
        id={typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={cn(
          'mb-4 mt-10 text-3xl font-semibold tracking-tight text-gray-900',
          'scroll-m-20 border-b border-gray-200 pb-2 first:mt-0',
        )}
        id={typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={cn(
          'mb-4 mt-8 text-2xl font-semibold tracking-tight text-gray-900',
          'scroll-m-20',
        )}
        id={typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={cn(
          'mb-4 mt-6 text-xl font-semibold tracking-tight text-gray-900',
          'scroll-m-20',
        )}
        id={typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined}
      >
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 font-secondary leading-7 text-gray-700 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary bg-gray-50 pl-6 italic text-gray-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc font-secondary text-gray-700 [&>li]:mt-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal font-secondary text-gray-700 [&>li]:mt-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
}
