import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#e9f2ff] text-[#0c66e4]",
        secondary: "bg-[#f1f2f4] text-[#44546f]",
        success: "bg-[#dcfff1] text-[#216e4e]",
        warning: "bg-[#fff7d6] text-[#946f00]",
        danger: "bg-[#ffeceb] text-[#c9372c]",
        outline: "border border-[#dfe1e6] text-[#44546f]",
      },
    },
    defaultVariants: { variant: "secondary" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
