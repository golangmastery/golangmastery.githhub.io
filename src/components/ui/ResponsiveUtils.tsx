import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

// Simple responsive visibility component
export const Show: React.FC<{
  children: ReactNode;
  above?: 'md' | 'lg' | 'xl';
  below?: 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ children, above, below, className }) => {
  let visibilityClass = '';
  
  if (above === 'md') visibilityClass = 'hidden md:block';
  if (above === 'lg') visibilityClass = 'hidden lg:block';
  if (above === 'xl') visibilityClass = 'hidden xl:block';
  
  if (below === 'md') visibilityClass = 'block md:hidden';
  if (below === 'lg') visibilityClass = 'block lg:hidden';
  if (below === 'xl') visibilityClass = 'block xl:hidden';
  
  if (!above && !below) visibilityClass = 'block';

  return (
    <div className={cn(visibilityClass, className)}>
      {children}
    </div>
  );
};

// Enhanced responsive container with better full-width support
export const ResponsiveContainer: React.FC<{
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
}> = ({
  children,
  className,
  maxWidth = '2xl',
  padding = true
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-4xl';
      case 'xl': return 'max-w-6xl';
      case '2xl': return 'max-w-7xl';
      case 'full': return 'max-w-none';
      default: return 'max-w-7xl';
    }
  };

  const getPaddingClass = () => {
    if (!padding) return '';
    
    // Less padding for full width to maximize content space
    if (maxWidth === 'full') {
      return 'px-2 sm:px-4 lg:px-6';
    }
    
    return 'px-4 sm:px-6 lg:px-8';
  };

  return (
    <div className={cn(
      'mx-auto w-full',
      getMaxWidthClass(),
      getPaddingClass(),
      className
    )}>
      {children}
    </div>
  );
};

// Enhanced responsive flex layout
export const ResponsiveFlex: React.FC<{
  children: ReactNode;
  direction?: 'col' | 'row' | 'col-md-row' | 'col-lg-row';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
  className?: string;
}> = ({
  children,
  direction = 'row',
  gap = 'md',
  align = 'start',
  justify = 'start',
  className
}) => {
  const getDirectionClass = () => {
    switch (direction) {
      case 'col': return 'flex-col';
      case 'row': return 'flex-row';
      case 'col-md-row': return 'flex-col md:flex-row';
      case 'col-lg-row': return 'flex-col lg:flex-row';
      default: return 'flex-row';
    }
  };

  const getGapClass = () => {
    switch (gap) {
      case 'xs': return 'gap-2';
      case 'sm': return 'gap-4';
      case 'md': return 'gap-6';
      case 'lg': return 'gap-8';
      case 'xl': return 'gap-12';
      default: return 'gap-6';
    }
  };

  return (
    <div className={cn(
      'flex',
      getDirectionClass(),
      getGapClass(),
      `items-${align}`,
      `justify-${justify}`,
      className
    )}>
      {children}
    </div>
  );
};

// Enhanced responsive grid
export const ResponsiveGrid: React.FC<{
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}> = ({
  children,
  cols = 2,
  gap = 'md',
  className
}) => {
  const getGridClass = () => {
    let gridClass = 'grid grid-cols-1';
    
    if (cols >= 2) gridClass += ' md:grid-cols-2';
    if (cols >= 3) gridClass += ' lg:grid-cols-3';
    if (cols === 4) gridClass += ' xl:grid-cols-4';
    
    return gridClass;
  };

  const getGapClass = () => {
    switch (gap) {
      case 'xs': return 'gap-2';
      case 'sm': return 'gap-4';
      case 'md': return 'gap-6';
      case 'lg': return 'gap-8';
      default: return 'gap-6';
    }
  };

  return (
    <div className={cn(
      getGridClass(),
      getGapClass(),
      className
    )}>
      {children}
    </div>
  );
};

export default {
  Show,
  ResponsiveContainer,
  ResponsiveFlex,
  ResponsiveGrid
}; 