import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-[var(--amber)] text-[#1a1206] hover:brightness-110",
        secondary:
          "bg-[var(--panel-2)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--cyan)]",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--text)] hover:border-[var(--cyan)]",
        ghost: "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--panel-2)]",
        destructive: "bg-[var(--red)] text-white hover:brightness-110",
        success: "bg-[var(--green)] text-[#0a0d12] hover:brightness-110",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-[10px] px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
