import React, { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  withPattern?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = '',
  withPattern = true
}) => {
  return (
    <div className={`
      min-h-screen w-full 
      bg-gray-50 dark:bg-gray-900
      ${className}
    `}>
      {withPattern && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/subtle-pattern.png')] opacity-[0.02] dark:opacity-[0.03]" />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper; 