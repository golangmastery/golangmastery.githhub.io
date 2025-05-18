import Link from 'next/link';
import { useState } from 'react';

interface ModuleCardProps {
  title: string;
  description: string;
  slug: string;
  courseSlug: string;
  order?: number;
  estimatedTime?: string;
  isCurrent?: boolean;
  isCompleted?: boolean;
  onComplete?: (slug: string) => void;
}

export default function ModuleCard({
  title,
  description,
  slug,
  courseSlug,
  order,
  estimatedTime = '10 mins',
  isCurrent = false,
  isCompleted = false,
  onComplete
}: ModuleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`
        relative bg-white border rounded-lg overflow-hidden transition-all duration-200
        ${isCurrent ? 'shadow-md border-blue-200 ring-2 ring-blue-100' : 'shadow hover:shadow-md'}
        ${isHovered ? 'transform -translate-y-1' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Optional status indicator */}
      {(isCurrent || isCompleted) && (
        <div className="absolute top-0 left-0 right-0 h-1">
          <div 
            className={`h-full ${isCurrent ? 'bg-blue-500' : isCompleted ? 'bg-green-500' : 'bg-transparent'}`}
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start">
            {order !== undefined && (
              <span className={`
                flex items-center justify-center w-7 h-7 rounded-full mr-3 text-sm font-semibold
                ${isCurrent ? 'bg-blue-100 text-blue-700' : 
                  isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
              `}>
                {order}
              </span>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          
          {/* Completion checkbox */}
          {onComplete && (
            <button
              onClick={() => onComplete(slug)}
              className={`
                w-6 h-6 rounded-full border flex items-center justify-center transition-colors
                ${isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 bg-white hover:border-green-500'}
              `}
              aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {isCompleted && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {estimatedTime}
          </div>
          
          <Link
            href={`/courses/${courseSlug}/${slug}`}
            className={`
              px-3 py-1.5 text-sm font-medium rounded transition-colors
              ${isCurrent
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : isCompleted
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
            `}
          >
            {isCurrent ? 'Continue' : isCompleted ? 'Review' : 'Start'}
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Progress indicator for current module */}
      {isCurrent && isHovered && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
          <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }} />
        </div>
      )}
    </div>
  );
} 