import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        /* Unityaliving design system variants */
        luxe: "rounded-none bg-charcoal text-charcoal-foreground tracking-[0.14em] uppercase text-[0.7rem] transition-all duration-500 hover:bg-gold",
        luxeOutline:
          "rounded-none border border-charcoal/25 bg-transparent text-foreground tracking-[0.14em] uppercase text-[0.7rem] transition-all duration-500 hover:border-gold hover:text-gold",
        luxeLight:
          "rounded-none border border-cream/30 bg-transparent text-cream tracking-[0.14em] uppercase text-[0.7rem] transition-all duration-500 hover:border-gold hover:text-gold",
        gold: "rounded-none bg-gold text-gold-foreground tracking-[0.14em] uppercase text-[0.7rem] transition-all duration-500 hover:bg-charcoal hover:text-charcoal-foreground",
        pill: "rounded-full border border-charcoal/20 bg-transparent text-foreground tracking-[0.12em] uppercase text-[0.68rem] transition-colors duration-500 hover:border-gold hover:text-gold",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        luxe: "h-12 px-8",
        luxeSm: "h-9 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
