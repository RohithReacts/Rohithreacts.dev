import * as React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const brandVariants = cva("flex items-center gap-3 transition-all", {
  variants: {
    size: {
      sm: "scale-90",
      md: "scale-100",
      lg: "scale-110",
    },
    layout: {
      default: "",
      fixed: "absolute top-8 left-10 z-50",
    },
  },
  defaultVariants: {
    size: "md",
    layout: "default",
  },
});

export interface BrandLogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof brandVariants> {
  name: string;
  tagline?: string;
  logo: string;
}

export function BrandLogo({
  className,
  size,
  layout,
  name,
  tagline,
  logo,
  ...props
}: BrandLogoProps) {
  return (
    <div className={cn(brandVariants({ size, layout }), className)} {...props}>
      <div className="relative h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2">
        <Image src={logo} alt={name} fill className="object-contain" />
      </div>

      <div className="leading-tight">
        <p className="font-roboto font-semibold text-zinc-900 dark:text-white">
          {name}
        </p>
        {tagline && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
}
