import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import Header from '../Header';
import Footer from '../Footer';
import PageWrapper from '../PageWrapper';

interface LayoutProps {
  children: ReactNode;
  variant?: 'default' | 'course' | 'minimal' | 'full-width' | 'centered';
  withHeader?: boolean;
  withFooter?: boolean;
  headerProps?: any;
  className?: string;
  contentClassName?: string;
  maxWidth?: 'full' | 'screen-xl' | 'screen-2xl' | '7xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'gradient' | 'minimal' | 'course';
}

const Layout: React.FC<LayoutProps> = ({
  children,
  variant = 'default',
  withHeader = true,
  withFooter = true,
  headerProps = {},
  className,
  contentClassName,
  maxWidth = 'screen-2xl',
  spacing = 'lg',
  background = 'default'
}) => {
  const getLayoutConfig = () => {
    switch (variant) {
      case 'course':
        return {
          spacing: 'lg' as const,
          maxWidth: 'screen-2xl' as const,
          background: 'gradient' as const
        };
      case 'minimal':
        return {
          spacing: 'md' as const,
          maxWidth: 'screen-xl' as const,
          background: 'minimal' as const
        };
      case 'full-width':
        return {
          spacing: 'none' as const,
          maxWidth: 'full' as const,
          background: 'default' as const
        };
      case 'centered':
        return {
          spacing: 'xl' as const,
          maxWidth: '7xl' as const,
          background: 'default' as const
        };
      default:
        return {
          spacing: spacing,
          maxWidth: maxWidth,
          background: background
        };
    }
  };

  const config = getLayoutConfig();

  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {withHeader && (
        <Header {...headerProps} />
      )}
      
      <main className="flex-1">
        <PageWrapper
          variant={config.background}
          maxWidth={config.maxWidth}
          spacing={config.spacing}
          className={contentClassName}
        >
          {children}
        </PageWrapper>
      </main>
      
      {withFooter && (
        <Footer />
      )}
    </div>
  );
};

// Specialized layout components
export const CourseLayout: React.FC<{
  children: ReactNode;
  className?: string;
  withSidebar?: boolean;
}> = ({ children, className, withSidebar = false }) => (
  <Layout
    variant="course"
    className={className}
    contentClassName={cn(
      'space-y-8',
      withSidebar && 'lg:space-y-0'
    )}
  >
    {children}
  </Layout>
);

export const MinimalLayout: React.FC<{
  children: ReactNode;
  className?: string;
  centered?: boolean;
}> = ({ children, className, centered = false }) => (
  <Layout
    variant={centered ? 'centered' : 'minimal'}
    withFooter={false}
    className={className}
  >
    {children}
  </Layout>
);

export const FullWidthLayout: React.FC<{
  children: ReactNode;
  className?: string;
  withPattern?: boolean;
}> = ({ children, className, withPattern = true }) => (
  <Layout
    variant="full-width"
    className={className}
  >
    <PageWrapper 
      withPattern={withPattern}
      spacing="none"
      maxWidth="full"
    >
      {children}
    </PageWrapper>
  </Layout>
);

// Content sections for better organization
export const ContentSection: React.FC<{
  children: ReactNode;
  className?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}> = ({ 
  children, 
  className, 
  spacing = 'md',
  background = false,
  rounded = false,
  shadow = false,
  padding = 'lg'
}) => {
  const getSpacingClasses = () => {
    switch (spacing) {
      case 'none': return '';
      case 'sm': return 'space-y-4';
      case 'md': return 'space-y-6';
      case 'lg': return 'space-y-8';
      case 'xl': return 'space-y-12';
      default: return 'space-y-6';
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case 'none': return '';
      case 'sm': return 'p-4';
      case 'md': return 'p-6';
      case 'lg': return 'p-8';
      case 'xl': return 'p-12';
      default: return 'p-8';
    }
  };

  return (
    <section className={cn(
      getSpacingClasses(),
      background && 'bg-white/80 backdrop-blur-sm border border-gray-200/50',
      rounded && 'rounded-2xl',
      shadow && 'shadow-lg',
      background && getPaddingClasses(),
      className
    )}>
      {children}
    </section>
  );
};

// Grid system for content organization
export const ContentGrid: React.FC<{
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  responsive?: boolean;
}> = ({ 
  children, 
  cols = 2, 
  gap = 'lg',
  className,
  responsive = true
}) => {
  const getGridClasses = () => {
    const baseClass = 'grid';
    const colsClass = responsive 
      ? `grid-cols-1 ${cols >= 2 ? 'md:grid-cols-2' : ''} ${cols >= 3 ? 'lg:grid-cols-3' : ''} ${cols === 4 ? 'xl:grid-cols-4' : ''}`
      : `grid-cols-${cols}`;
    
    const gapClass = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12'
    }[gap];
    
    return `${baseClass} ${colsClass} ${gapClass}`;
  };

  return (
    <div className={cn(getGridClasses(), className)}>
      {children}
    </div>
  );
};

// Flex layout utilities
export const FlexLayout: React.FC<{
  children: ReactNode;
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  className?: string;
}> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  gap = 'md',
  wrap = false,
  className
}) => {
  const getFlexClasses = () => {
    const directionClass = direction === 'col' ? 'flex-col' : 'flex-row';
    const justifyClass = `justify-${justify}`;
    const alignClass = `items-${align}`;
    const gapClass = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8'
    }[gap];
    const wrapClass = wrap ? 'flex-wrap' : '';
    
    return `flex ${directionClass} ${justifyClass} ${alignClass} ${gapClass} ${wrapClass}`;
  };

  return (
    <div className={cn(getFlexClasses(), className)}>
      {children}
    </div>
  );
};

// Responsive container
export const ResponsiveContainer: React.FC<{
  children: ReactNode;
  className?: string;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}> = ({ children, className, breakpoint = 'lg' }) => {
  const getBreakpointClasses = () => {
    switch (breakpoint) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-4xl';
      case 'xl': return 'max-w-6xl';
      case '2xl': return 'max-w-7xl';
      default: return 'max-w-4xl';
    }
  };

  return (
    <div className={cn(
      'mx-auto w-full px-4 sm:px-6 lg:px-8',
      getBreakpointClasses(),
      className
    )}>
      {children}
    </div>
  );
};

export default Layout; 