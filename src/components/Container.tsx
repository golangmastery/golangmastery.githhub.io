import React, { useEffect, useState } from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'prose';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  withBackground?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  maxWidth = 'lg',
  padding = 'md',
  withBackground = false
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Map maxWidth to tailwind classes
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
    prose: 'max-w-prose'
  };

  // Map padding to tailwind classes
  const paddingClasses = {
    none: 'px-0',
    sm: 'px-3 sm:px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-10 lg:px-12'
  };

  const backgroundClasses = withBackground 
    ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm' 
    : '';

  return (
    <div className={`
      container mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} 
      ${backgroundClasses} transition-all duration-200 ease-in-out
      ${mounted ? 'opacity-100' : 'opacity-0 translate-y-2'}
      ${className}
    `}>
      <div className={`${withBackground ? 'p-4 sm:p-6' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Container; 