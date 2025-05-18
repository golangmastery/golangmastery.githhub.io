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
      },
      padding: {
        none: "px-0",
        sm: "px-3 sm:px-4",
        md: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-10 lg:px-12",
      },
      withBackground: {
        true: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm",
        false: "",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
      animation: {
        none: "",
        fadeIn: "animate-fade-in",
        slideUp: "animate-slide-up",
        scale: "animate-scale",
      }
    },
    defaultVariants: {
      maxWidth: "lg",
      padding: "md",
      withBackground: false,
      rounded: "none",
      shadow: "none",
      animation: "fadeIn",
    },
  }
);

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  children: React.ReactNode;
  as?: React.ElementType;
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
  as: Component = 'div',
  ...props
}: ContainerProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <Component
      className={cn(
        containerVariants({ maxWidth, padding, withBackground, rounded, shadow, animation }),
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        "transition duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      <div 
        className={withBackground ? "p-4 sm:p-6" : ""}
        data-animated={mounted ? "true" : "false"}
      >
        {children}
      </div>
    </Component>
  );
};

export default Container; 