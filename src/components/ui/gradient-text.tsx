"use client"

import React from "react";
import { motion, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-block text-transparent bg-clip-text",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="pointer-events-none absolute -top-1/4 -left-1/4 w-[150%] h-[150%] animate-[gradient-border_6s_ease-in-out_infinite,gradient-1_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-1))] mix-blend-overlay blur-[1rem]" />
        <span className="pointer-events-none absolute -top-1/4 -right-1/4 w-[150%] h-[150%] animate-[gradient-border_6s_ease-in-out_infinite,gradient-2_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-2))] mix-blend-overlay blur-[1rem]" />
        <span className="pointer-events-none absolute -bottom-1/4 -left-1/4 w-[150%] h-[150%] animate-[gradient-border_6s_ease-in-out_infinite,gradient-3_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-3))] mix-blend-overlay blur-[1rem]" />
        <span className="pointer-events-none absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] animate-[gradient-border_6s_ease-in-out_infinite,gradient-4_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-4))] mix-blend-overlay blur-[1rem]" />
      </span>
    </MotionComponent>
  );
}

export { GradientText };
