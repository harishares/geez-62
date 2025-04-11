
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

export interface AnimatedButtonProps extends ButtonProps {
  glowColor?: string;
  hoverScale?: boolean;
  slideContent?: boolean;
  pulseEffect?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    className, 
    variant = "default", 
    children, 
    glowColor = "rgba(139, 92, 246, 0.7)",
    hoverScale = true,
    slideContent = true,
    pulseEffect = false,
    ...props 
  }, ref) => {
    return (
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          hoverScale && "hover:scale-[1.02]",
          pulseEffect && "animate-pulse",
          `hover:shadow-[0_0_15px_${glowColor}]`,
          "group",
          className,
        )}
        variant={variant}
        ref={ref}
        {...props}
      >
        <span className={cn(
          "flex items-center justify-center gap-2",
          slideContent && "group-hover:translate-x-1 transition-transform duration-300"
        )}>
          {children}
        </span>
      </Button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
