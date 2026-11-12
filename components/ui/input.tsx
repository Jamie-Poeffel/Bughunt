import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-[#b3bac5] bg-white px-3 py-1 text-sm text-[#172b4d] shadow-sm transition-colors placeholder:text-[#626f86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85b8ff] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
