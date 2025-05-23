import React, { ReactNode, useEffect, useState } from 'react';
import { cn } from '../lib/utils';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  withPattern?: boolean;
  variant?: 'default' | 'gradient' | 'minimal' | 'course';
  loading?: boolean;
  maxWidth?: 'full' | 'screen-xl' | 'screen-2xl' | '7xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = '',
  withPattern = true,
  variant = 'default',
  loading = false,
  maxWidth = 'screen-2xl',
  spacing = 'lg'
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBackgroundClass = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30';
      case 'course':
        return 'bg-gradient-to-br from-primary-50/20 via-white to-purple-50/20';
      case 'minimal':
        return 'bg-white';
      default:
        return 'bg-gradient-to-br from-gray-50 via-white to-slate-50/50';
    }
  };

  const getSpacingClass = () => {
    switch (spacing) {
      case 'none': return 'p-0';
      case 'sm': return 'p-4 lg:p-6';
      case 'md': return 'p-6 lg:p-8';
      case 'lg': return 'p-6 lg:p-8 xl:p-12';
      case 'xl': return 'p-8 lg:p-12 xl:p-16';
      default: return 'p-6 lg:p-8';
    }
  };

  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'full': return 'max-w-full';
      case 'screen-xl': return 'max-w-screen-xl';
      case 'screen-2xl': return 'max-w-screen-2xl';
      case '7xl': return 'max-w-7xl';
      default: return 'max-w-screen-2xl';
    }
  };

  return (
    <div className={cn(
      'min-h-screen w-full relative overflow-hidden',
      getBackgroundClass(),
      'transition-all duration-500 ease-out',
      className
    )}>
      {/* Background Patterns and Decorations */}
      {withPattern && (
        <>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />
          
          {/* Floating Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary-500/5 to-transparent rounded-full blur-3xl pointer-events-none animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-500/3 to-cyan-500/3 rounded-full blur-3xl pointer-events-none animate-pulse" />
        </>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-4 border border-gray-100">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-gray-900 font-semibold">Loading...</p>
              <p className="text-gray-500 text-sm mt-1">Please wait while we prepare your content</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className={cn(
        'relative z-10 min-h-screen flex flex-col',
        mounted ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-700 ease-out'
      )}>
        {/* Content Wrapper */}
        <div className={cn(
          'flex-1 mx-auto w-full',
          getMaxWidthClass(),
          getSpacingClass()
        )}>
          <div className={cn(
            'transition-all duration-500 ease-out',
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}>
            {children}
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>

      {/* Additional Decorative Elements */}
      {variant === 'gradient' && (
        <>
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-400 rounded-full opacity-30 animate-ping" />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse" />
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-25 animate-bounce" />
        </>
      )}
    </div>
  );
};

// Scroll to Top Component
const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-8 right-8 z-50',
            'w-12 h-12 bg-white shadow-lg border border-gray-200',
            'rounded-full flex items-center justify-center',
            'text-gray-600 hover:text-primary-600',
            'hover:shadow-xl hover:bg-primary-50',
            'transition-all duration-300 transform hover:scale-110',
            'backdrop-blur-sm bg-white/90'
          )}
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

export default PageWrapper; 