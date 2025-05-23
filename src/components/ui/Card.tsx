import React, { ReactNode, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200",
        glass: "bg-white/80 backdrop-blur-sm border border-gray-200/50",
        gradient: "bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50",
        elevated: "bg-white border-0 shadow-lg",
        outline: "bg-transparent border-2 border-gray-200",
        ghost: "bg-transparent",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
        none: "",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
        glow: "shadow-lg shadow-primary-500/25",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-lg",
        scale: "hover:scale-[1.02]",
        glow: "hover:shadow-xl hover:shadow-primary-500/20",
        border: "hover:border-primary-300",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "lg",
      shadow: "sm",
      hover: "none",
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, rounded, shadow, hover, children, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, rounded, shadow, hover }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  withBorder?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, withBorder = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5 p-6",
          withBorder && "border-b border-gray-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// Card Title Component
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = 'h3', size = 'lg', ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "font-semibold leading-none tracking-tight text-gray-900",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = "CardTitle";

// Card Description Component
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-gray-600 leading-relaxed", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = "CardDescription";

// Card Content Component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

// Card Footer Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  withBorder?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, withBorder = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center p-6 pt-0",
          withBorder && "border-t border-gray-200 pt-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

// Interactive Card with built-in hover states
interface InteractiveCardProps extends CardProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ className, children, onClick, href, disabled = false, hover = "lift", ...props }, ref) => {
    const isClickable = onClick || href;
    
    if (href) {
      return (
        <a
          href={href}
          onClick={disabled ? undefined : onClick}
          className={cn(
            cardVariants({ ...props, hover: isClickable && !disabled ? hover : "none" }),
            isClickable && !disabled && "cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {children}
        </a>
      );
    }
    
    return (
      <div
        ref={ref}
        onClick={disabled ? undefined : onClick}
        className={cn(
          cardVariants({ ...props, hover: isClickable && !disabled ? hover : "none" }),
          isClickable && !disabled && "cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";

// Card with image
interface ImageCardProps extends CardProps {
  children: ReactNode;
  image: string;
  imageAlt: string;
  imagePosition?: 'top' | 'left' | 'right' | 'background';
}

const ImageCard = forwardRef<HTMLDivElement, ImageCardProps>(
  ({ className, children, image, imageAlt, imagePosition = 'top', ...props }, ref) => {
    if (imagePosition === 'background') {
      return (
        <Card
          ref={ref}
          className={cn("relative", className)}
          {...props}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white">
            {children}
          </div>
        </Card>
      );
    }

    if (imagePosition === 'left' || imagePosition === 'right') {
      return (
        <Card
          ref={ref}
          className={cn("flex", imagePosition === 'right' && "flex-row-reverse", className)}
          size="none"
          {...props}
        >
          <div className="flex-shrink-0 w-48">
            <img 
              src={image} 
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-6">
            {children}
          </div>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        className={className}
        size="none"
        {...props}
      >
        <div className="aspect-video w-full">
          <img 
            src={image} 
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          {children}
        </div>
      </Card>
    );
  }
);

ImageCard.displayName = "ImageCard";

// Stats Card for displaying metrics
interface StatsCardProps extends CardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, title, value, description, icon, trend, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={className}
        variant="glass"
        hover="lift"
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle size="sm" className="text-gray-600 font-medium">
              {title}
            </CardTitle>
            {icon && (
              <div className="text-gray-400">
                {icon}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gray-900">
              {value}
            </div>
            {description && (
              <CardDescription>
                {description}
              </CardDescription>
            )}
            {trend && (
              <div className={cn(
                "flex items-center text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                <span className={cn(
                  "mr-1",
                  trend.isPositive ? "↗" : "↘"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-gray-500">vs last period</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

StatsCard.displayName = "StatsCard";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  InteractiveCard,
  ImageCard,
  StatsCard,
}; 