import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn/ui Badge — brand-tuned.
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border-ink text-ink',
        gold: 'border-gold text-gold',
        solid: 'border-transparent bg-indigo text-paper',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
