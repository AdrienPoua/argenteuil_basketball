import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: cn(
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/90',
          'cursor-pointer whitespace-nowrap px-3 py-1 text-xs font-medium text-white transition-colors',
        ),
        secondary:
          'cursor-pointer whitespace-nowrap bg-secondary px-3 py-1 text-xs font-medium text-white transition-colors',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        staffCard: 'border-none bg-primary font-secondary text-foreground',
        success: 'border-none bg-green-500 text-white',
        match:
          'mb-4 w-full justify-center border-transparent bg-primary text-lg text-primary-foreground shadow hover:bg-primary/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
