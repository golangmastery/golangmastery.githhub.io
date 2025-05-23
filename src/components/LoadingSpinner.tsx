import React from 'react';
import { cn } from '../lib/utils';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spin' | 'dots' | 'pulse' | 'bounce' | 'fade';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white';
  text?: string;
  fullscreen?: boolean;
  overlay?: boolean;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'spin',
  color = 'primary',
  text,
  fullscreen = false,
  overlay = false,
  className
}: LoadingSpinnerProps) {
  
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'w-3 h-3';
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      case 'xl': return 'w-16 h-16';
      default: return 'w-8 h-8';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary': return 'border-primary-500 text-primary-500';
      case 'secondary': return 'border-gray-500 text-gray-500';
      case 'success': return 'border-green-500 text-green-500';
      case 'warning': return 'border-yellow-500 text-yellow-500';
      case 'danger': return 'border-red-500 text-red-500';
      case 'white': return 'border-white text-white';
      default: return 'border-primary-500 text-primary-500';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'xs': return 'text-xs';
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  const renderSpinner = () => {
    const baseClasses = cn(getSizeClasses(), getColorClasses());
    
    switch (variant) {
      case 'spin':
        return (
          <div 
            className={cn(
              baseClasses,
              'rounded-full border-4 border-t-transparent animate-spin'
            )}
            role="status"
            aria-label="Loading"
          />
        );
        
      case 'dots':
        return (
          <div className="flex space-x-1" role="status" aria-label="Loading">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  getSizeClasses().replace('w-8 h-8', 'w-2 h-2').replace('w-12 h-12', 'w-3 h-3').replace('w-16 h-16', 'w-4 h-4'),
                  getColorClasses().split(' ')[1].replace('text-', 'bg-'),
                  'rounded-full animate-bounce'
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );
        
      case 'pulse':
        return (
          <div
            className={cn(
              baseClasses,
              'rounded-full bg-current animate-pulse opacity-75'
            )}
            role="status"
            aria-label="Loading"
          />
        );
        
      case 'bounce':
        return (
          <div className="flex space-x-1" role="status" aria-label="Loading">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  getSizeClasses().replace('w-8 h-8', 'w-2 h-2').replace('w-12 h-12', 'w-3 h-3').replace('w-16 h-16', 'w-4 h-4'),
                  getColorClasses().split(' ')[1].replace('text-', 'bg-'),
                  'rounded-full animate-bounce'
                )}
                style={{ 
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.6s'
                }}
              />
            ))}
          </div>
        );
        
      case 'fade':
        return (
          <div className="flex space-x-1" role="status" aria-label="Loading">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  'w-1 h-8 rounded-full',
                  getColorClasses().split(' ')[1].replace('text-', 'bg-'),
                  'animate-pulse'
                )}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );
        
      default:
        return (
          <div 
            className={cn(
              baseClasses,
              'rounded-full border-4 border-t-transparent animate-spin'
            )}
            role="status"
            aria-label="Loading"
          />
        );
    }
  };

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center space-y-4',
      className
    )}>
      {renderSpinner()}
      
      {text && (
        <div className="text-center">
          <p className={cn(
            'font-medium',
            getTextSize(),
            color === 'white' ? 'text-white' : 'text-gray-900'
          )}>
            {text}
          </p>
          {size === 'lg' || size === 'xl' ? (
            <p className={cn(
              'text-sm mt-1',
              color === 'white' ? 'text-white/80' : 'text-gray-500'
            )}>
              Please wait a moment
            </p>
          ) : null}
        </div>
      )}
    </div>
  );

  if (fullscreen || overlay) {
    return (
      <div className={cn(
        fullscreen ? 'fixed' : 'absolute',
        'inset-0 z-50 flex items-center justify-center',
        overlay ? 'bg-white/80 backdrop-blur-sm' : '',
        'transition-all duration-300'
      )}>
        {overlay && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        )}
        <div className={cn(
          overlay ? 'relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8' : '',
          'flex flex-col items-center justify-center'
        )}>
          {content}
        </div>
      </div>
    );
  }

  return content;
}

// Skeleton Loader Component
export const SkeletonLoader: React.FC<{
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'button';
  lines?: number;
  width?: string;
  height?: string;
}> = ({ 
  className, 
  variant = 'text', 
  lines = 3, 
  width = 'w-full', 
  height = 'h-4' 
}) => {
  const baseClasses = 'bg-gray-200 rounded animate-pulse';
  
  switch (variant) {
    case 'text':
      return (
        <div className={cn('space-y-2', className)}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(
                baseClasses,
                height,
                i === lines - 1 ? 'w-3/4' : width
              )}
            />
          ))}
        </div>
      );
      
    case 'card':
      return (
        <div className={cn('space-y-4 p-4', className)}>
          <div className={cn(baseClasses, 'h-48 w-full')} />
          <div className="space-y-2">
            <div className={cn(baseClasses, 'h-4 w-3/4')} />
            <div className={cn(baseClasses, 'h-4 w-1/2')} />
          </div>
        </div>
      );
      
    case 'avatar':
      return (
        <div className={cn(baseClasses, 'w-12 h-12 rounded-full', className)} />
      );
      
    case 'button':
      return (
        <div className={cn(baseClasses, 'h-10 w-24 rounded-lg', className)} />
      );
      
    default:
      return (
        <div className={cn(baseClasses, width, height, className)} />
      );
  }
};

// Loading States Hook
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);
  
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const toggleLoading = () => setIsLoading(prev => !prev);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    setIsLoading
  };
}; 