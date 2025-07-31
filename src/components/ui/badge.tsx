import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: cn(
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/90',
          'text-white cursor-pointer transition-colors whitespace-nowrap px-3 py-1 text-xs font-medium',
        ),
        secondary:
          'text-white cursor-pointer transition-colors whitespace-nowrap px-3 py-1 text-xs font-medium bg-secondary',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        staffCard: 'bg-primary font-secondary text-foreground border-none',
        success: 'bg-green-500 text-white border-none',
        match:
          'w-full justify-center mb-4 text-lg border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 ',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
