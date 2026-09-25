import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "press inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-blush disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-fg shadow-sm hover:bg-primary-hover",
        secondary:
          "bg-paper/80 text-ink ring-1 ring-dusty/45 hover:bg-paper",
        ghost: "text-ink-soft hover:bg-white/45 hover:text-ink",
        outline:
          "bg-white/35 text-ink ring-1 ring-white/70 hover:bg-white/55",
        sage: "bg-sage text-paper hover:opacity-90",
      },
      size: {
        default: "h-11 px-5 rounded-xl",
        sm: "h-9 px-3.5 rounded-lg text-xs",
        lg: "h-12 px-6 rounded-2xl text-base",
        pill: "h-12 px-6 rounded-full",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
