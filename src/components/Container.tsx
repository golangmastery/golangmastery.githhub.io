'use client';

import React, { useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const containerVariants = cva(
  "container mx-auto will-change-transform",
  {
    variants: {
      maxWidth: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
        prose: "max-w-prose",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
      },
      padding: {
        none: "px-0",
        xs: "px-2 sm:px-3",
        sm: "px-3 sm:px-4",
        md: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12",
        xl: "px-8 sm:px-12 lg:px-16",
        "2xl": "px-12 sm:px-16 lg:px-24",
      },
      withBackground: {
        true: "bg-white/80 backdrop-blur-sm border border-gray-200/50",
        false: "",
        glass: "bg-white/60 backdrop-blur-md border border-white/20 shadow-xl",
        gradient: "bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50",
        solid: "bg-white border border-gray-200",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
      shadow: {
        none: "shadow-none",
        xs: "shadow-xs",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
        inner: "shadow-inner",
        glow: "shadow-lg shadow-primary-500/25",
        "glow-lg": "shadow-2xl shadow-primary-500/30",
      },
      animation: {
        none: "",
        fadeIn: "animate-fade-in",
        slideUp: "animate-slide-up",
        slideDown: "animate-slide-down",
        scale: "animate-scale",
        float: "animate-float",
        bounce: "animate-bounce-light",
        pulse: "animate-pulse-glow",
      },
      spacing: {
        none: "space-y-0",
        xs: "space-y-2",
        sm: "space-y-4",
        md: "space-y-6",
        lg: "space-y-8",
        xl: "space-y-12",
        "2xl": "space-y-16",
      }
    },
    defaultVariants: {
      maxWidth: "lg",
      padding: "md",
      withBackground: false,
      rounded: "none",
      shadow: "none",
      animation: "fadeIn",
      spacing: "none",
    },
  }
);

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  children: React.ReactNode;
  as?: React.ElementType;
  hover?: boolean;
  delay?: number;
}

const Container = ({
  children,
  className,
  maxWidth,
  padding, 
  withBackground,
  rounded,
  shadow,
  animation,
  spacing,
  as: Component = 'div',
  hover = false,
  delay = 0,
  ...props
}: ContainerProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, delay);
    
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, [delay]);

  return (
    <Component
      className={cn(
        containerVariants({ maxWidth, padding, withBackground, rounded, shadow, animation, spacing }),
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        "transition-all duration-500 ease-out",
        hover && "hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]",
        withBackground === "glass" && "dark:bg-gray-900/60 dark:border-gray-700/20",
        withBackground === "gradient" && "dark:from-gray-900/90 dark:to-gray-800/90 dark:border-gray-700/50",
        withBackground === "solid" && "dark:bg-gray-900 dark:border-gray-700",
        className
      )}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
      }}
      {...props}
    >
      <div 
        className={cn(
          withBackground ? "p-4 sm:p-6" : "",
          spacing && spacing !== "none" && "space-y-6"
        )}
        data-animated={mounted ? "true" : "false"}
      >
        {children}
      </div>
      
      {/* Decorative elements for special backgrounds */}
      {withBackground === "glass" && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-inherit pointer-events-none" />
      )}
      
      {withBackground === "gradient" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 rounded-inherit pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}
      
      {/* Hover effect overlay */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-inherit pointer-events-none" />
      )}
    </Component>
  );
};

export default Container; 