import * as React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: {
    name: string
    href: string
  }[]
  separator?: React.ReactNode
  home?: boolean
}

export function Breadcrumb({
  segments,
  separator = <ChevronRight className="h-4 w-4" />,
  home = true,
  className,
  ...props
}: Readonly<BreadcrumbProps>) {
  return (
    <div className={cn('flex items-center space-x-2 font-secondary text-sm', className)} {...props}>
      {home && (
        <>
          <Link href="/dashboard" className="flex items-center opacity-80 hover:opacity-100">
            <Home className="h-4 w-4" />
          </Link>
          {separator}
        </>
      )}

      {segments.map((segment, index) => (
        <React.Fragment key={segment.href}>
          <Link
            href={segment.href}
            className={cn(
              'hover:underline',
              index === segments.length - 1
                ? 'font-semibold text-foreground'
                : 'opacity-80 hover:opacity-100',
            )}
          >
            {segment.name}
          </Link>
          {index < segments.length - 1 && <div className="opacity-60">{separator}</div>}
        </React.Fragment>
      ))}
    </div>
  )
}
