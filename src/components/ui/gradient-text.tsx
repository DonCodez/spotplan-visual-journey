
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
        "relative inline-flex overflow-hidden",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] via-[#84cc16] to-[#5da625] bg-clip-text text-transparent">
        {children}
      </span>
      <span className="pointer-events-none absolute inset-0 -z-10 mix-blend-lighten dark:mix-blend-darken">
        <span className="pointer-events-none absolute -top-1/2 h-[20vw] w-[20vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-1_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-1))] mix-blend-overlay blur-[0.8rem] opacity-30"></span>
        <span className="pointer-events-none absolute right-0 top-0 h-[20vw] w-[20vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-2_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-2))] mix-blend-overlay blur-[0.8rem] opacity-30"></span>
        <span className="pointer-events-none absolute bottom-0 left-0 h-[20vw] w-[20vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-3_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-3))] mix-blend-overlay blur-[0.8rem] opacity-30"></span>
        <span className="pointer-events-none absolute -bottom-1/2 right-0 h-[20vw] w-[20vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-4_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-4))] mix-blend-overlay blur-[0.8rem] opacity-30"></span>
      </span>
    </MotionComponent>
  );
}

export { GradientText }
