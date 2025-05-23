import React, { ReactNode, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

// Hook for detecting screen size
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        setScreenSize('xs');
        setIsMobile(true);
      } else if (width < 640) {
        setScreenSize('sm');
        setIsMobile(true);
      } else if (width < 768) {
        setScreenSize('md');
        setIsMobile(true);
      } else if (width < 1024) {
        setScreenSize('lg');
        setIsMobile(false);
      } else if (width < 1280) {
        setScreenSize('xl');
        setIsMobile(false);
      } else {
        setScreenSize('2xl');
        setIsMobile(false);
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return { screenSize, isMobile };
};

// Responsive visibility component
export const Show: React.FC<{
  children: ReactNode;
  above?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  below?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  only?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}> = ({ children, above, below, only, className }) => {
  const getVisibilityClasses = () => {
    if (only) {
      switch (only) {
        case 'xs': return 'block xs:hidden';
        case 'sm': return 'hidden xs:block sm:hidden';
        case 'md': return 'hidden sm:block md:hidden';
        case 'lg': return 'hidden md:block lg:hidden';
        case 'xl': return 'hidden lg:block xl:hidden';
        case '2xl': return 'hidden xl:block';
        default: return '';
      }
    }

    let classes = '';
    
    if (above) {
      switch (above) {
        case 'xs': classes += 'hidden xs:block'; break;
        case 'sm': classes += 'hidden sm:block'; break;
        case 'md': classes += 'hidden md:block'; break;
        case 'lg': classes += 'hidden lg:block'; break;
        case 'xl': classes += 'hidden xl:block'; break;
        default: break;
      }
    } else {
      classes += 'block';
    }

    if (below) {
      switch (below) {
        case 'sm': classes += ' xs:hidden'; break;
        case 'md': classes += ' sm:hidden'; break;
        case 'lg': classes += ' md:hidden'; break;
        case 'xl': classes += ' lg:hidden'; break;
        case '2xl': classes += ' xl:hidden'; break;
        default: break;
      }
    }

    return classes;
  };

  return (
    <div className={cn(getVisibilityClasses(), className)}>
      {children}
    </div>
  );
};

// Responsive spacing component
export const ResponsiveSpacing: React.FC<{
  children: ReactNode;
  mobile?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tablet?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  desktop?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'all' | 'vertical' | 'horizontal' | 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}> = ({ 
  children, 
  mobile = 'md', 
  tablet = 'lg', 
  desktop = 'xl',
  direction = 'all',
  className 
}) => {
  const getSpacingClasses = () => {
    const getSpacingValue = (size: string) => {
      switch (size) {
        case 'xs': return '2';
        case 'sm': return '4';
        case 'md': return '6';
        case 'lg': return '8';
        case 'xl': return '12';
        default: return '6';
      }
    };

    const getDirectionPrefix = () => {
      switch (direction) {
        case 'vertical': return 'py';
        case 'horizontal': return 'px';
        case 'top': return 'pt';
        case 'bottom': return 'pb';
        case 'left': return 'pl';
        case 'right': return 'pr';
        default: return 'p';
      }
    };

    const prefix = getDirectionPrefix();
    const mobileValue = getSpacingValue(mobile);
    const tabletValue = getSpacingValue(tablet);
    const desktopValue = getSpacingValue(desktop);

    return `${prefix}-${mobileValue} md:${prefix}-${tabletValue} lg:${prefix}-${desktopValue}`;
  };

  return (
    <div className={cn(getSpacingClasses(), className)}>
      {children}
    </div>
  );
};

// Responsive grid system
export const ResponsiveGrid: React.FC<{
  children: ReactNode;
  cols?: {
    mobile?: 1 | 2;
    tablet?: 1 | 2 | 3;
    desktop?: 1 | 2 | 3 | 4 | 5 | 6;
  };
  gap?: {
    mobile?: 'sm' | 'md' | 'lg';
    tablet?: 'sm' | 'md' | 'lg';
    desktop?: 'sm' | 'md' | 'lg' | 'xl';
  };
  className?: string;
}> = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 'md', tablet: 'md', desktop: 'lg' },
  className 
}) => {
  const getGridClasses = () => {
    const colClasses = `grid-cols-${cols.mobile || 1} md:grid-cols-${cols.tablet || 2} lg:grid-cols-${cols.desktop || 3}`;
    
    const getGapValue = (size: string) => {
      switch (size) {
        case 'sm': return '4';
        case 'md': return '6';
        case 'lg': return '8';
        case 'xl': return '12';
        default: return '6';
      }
    };

    const gapClasses = `gap-${getGapValue(gap.mobile || 'md')} md:gap-${getGapValue(gap.tablet || 'md')} lg:gap-${getGapValue(gap.desktop || 'lg')}`;
    
    return `grid ${colClasses} ${gapClasses}`;
  };

  return (
    <div className={cn(getGridClasses(), className)}>
      {children}
    </div>
  );
};

// Responsive flex layout
export const ResponsiveFlex: React.FC<{
  children: ReactNode;
  direction?: {
    mobile?: 'row' | 'col';
    tablet?: 'row' | 'col';
    desktop?: 'row' | 'col';
  };
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  className?: string;
}> = ({
  children,
  direction = { mobile: 'col', tablet: 'row', desktop: 'row' },
  justify = 'start',
  align = 'start',
  gap = 'md',
  wrap = false,
  className
}) => {
  const getFlexClasses = () => {
    const directionClasses = `flex-${direction.mobile || 'col'} md:flex-${direction.tablet || 'row'} lg:flex-${direction.desktop || 'row'}`;
    const justifyClass = `justify-${justify}`;
    const alignClass = `items-${align}`;
    
    const gapValue = {
      sm: '2',
      md: '4',
      lg: '6',
      xl: '8'
    }[gap] || '4';
    
    const gapClass = `gap-${gapValue}`;
    const wrapClass = wrap ? 'flex-wrap' : '';
    
    return `flex ${directionClasses} ${justifyClass} ${alignClass} ${gapClass} ${wrapClass}`;
  };

  return (
    <div className={cn(getFlexClasses(), className)}>
      {children}
    </div>
  );
};

// Responsive text sizing
export const ResponsiveText: React.FC<{
  children: ReactNode;
  size?: {
    mobile?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
    tablet?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    desktop?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  };
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: {
    mobile?: 'left' | 'center' | 'right';
    tablet?: 'left' | 'center' | 'right';
    desktop?: 'left' | 'center' | 'right';
  };
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}> = ({
  children,
  size = { mobile: 'base', tablet: 'lg', desktop: 'xl' },
  weight = 'normal',
  align = { mobile: 'left', tablet: 'left', desktop: 'left' },
  className,
  as: Component = 'div'
}) => {
  const getTextClasses = () => {
    const sizeClasses = `text-${size.mobile || 'base'} md:text-${size.tablet || 'lg'} lg:text-${size.desktop || 'xl'}`;
    const weightClass = `font-${weight}`;
    const alignClasses = `text-${align.mobile || 'left'} md:text-${align.tablet || 'left'} lg:text-${align.desktop || 'left'}`;
    
    return `${sizeClasses} ${weightClass} ${alignClasses}`;
  };

  return (
    <Component className={cn(getTextClasses(), className)}>
      {children}
    </Component>
  );
};

// Responsive container with breakpoint-specific max widths
export const ResponsiveContainer: React.FC<{
  children: ReactNode;
  size?: {
    mobile?: 'full' | 'sm' | 'md' | 'lg' | 'xl';
    tablet?: 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    desktop?: 'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  };
  padding?: boolean;
  className?: string;
}> = ({
  children,
  size = { mobile: 'full', tablet: 'xl', desktop: '2xl' },
  padding = true,
  className
}) => {
  const getContainerClasses = () => {
    const getSizeClass = (s: string) => {
      switch (s) {
        case 'full': return 'max-w-full';
        case 'sm': return 'max-w-sm';
        case 'md': return 'max-w-md';
        case 'lg': return 'max-w-lg';
        case 'xl': return 'max-w-xl';
        case '2xl': return 'max-w-2xl';
        case '3xl': return 'max-w-3xl';
        case '4xl': return 'max-w-4xl';
        default: return 'max-w-full';
      }
    };

    const sizeClasses = `${getSizeClass(size.mobile || 'full')} md:${getSizeClass(size.tablet || 'xl').replace('max-w-', 'max-w-')} lg:${getSizeClass(size.desktop || '2xl').replace('max-w-', 'max-w-')}`;
    const paddingClass = padding ? 'px-4 sm:px-6 lg:px-8' : '';
    
    return `mx-auto w-full ${sizeClasses} ${paddingClass}`;
  };

  return (
    <div className={cn(getContainerClasses(), className)}>
      {children}
    </div>
  );
};

// Mobile-first utility component
export const MobileFirst: React.FC<{
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}> = ({ children, fallback, className }) => {
  const { isMobile } = useScreenSize();
  
  return (
    <div className={className}>
      {isMobile && fallback ? fallback : children}
    </div>
  );
};

export default {
  useScreenSize,
  Show,
  ResponsiveSpacing,
  ResponsiveGrid,
  ResponsiveFlex,
  ResponsiveText,
  ResponsiveContainer,
  MobileFirst
}; 