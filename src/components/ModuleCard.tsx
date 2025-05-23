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
        group relative bg-white/90 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10
        ${isCurrent ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/20 border-primary-200' : 'border-gray-200 hover:border-primary-200'}
        ${isHovered ? 'transform -translate-y-2 scale-[1.02]' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div 
          className={`h-full transition-all duration-300 ${
            isCurrent ? 'bg-gradient-to-r from-primary-500 to-purple-500' : 
            isCompleted ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
            'bg-transparent'
          }`}
        />
      </div>
      
      {/* Card header with gradient background */}
      <div className={`
        relative p-6 bg-gradient-to-br transition-all duration-300
        ${isCurrent ? 'from-primary-50 to-purple-50' :
          isCompleted ? 'from-green-50 to-emerald-50' :
          'from-gray-50 to-gray-100 group-hover:from-primary-50 group-hover:to-purple-50'}
      `}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            {/* Module order indicator */}
            <div className={`
              relative flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg transition-all duration-300
              ${isCurrent ? 'bg-gradient-to-br from-primary-500 to-purple-600 text-white shadow-lg' : 
                isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md' : 
                'bg-white text-gray-700 shadow-sm group-hover:shadow-md border border-gray-200'}
            `}>
              {order !== undefined ? order : '?'}
              {isCurrent && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-purple-500 rounded-xl opacity-20 animate-pulse"></div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className={`
                text-xl font-bold transition-colors duration-300 leading-tight
                ${isCurrent ? 'text-primary-700' : 
                  isCompleted ? 'text-green-700' : 
                  'text-gray-900 group-hover:text-primary-700'}
              `}>
                {title}
              </h3>
              
              {/* Status badge */}
              <div className="flex items-center mt-2 space-x-2">
                {isCurrent && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-1.5 animate-pulse"></div>
                    Current
                  </span>
                )}
                {isCompleted && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Completion toggle */}
          {onComplete && (
            <button
              onClick={() => onComplete(slug)}
              className={`
                group/btn w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-200 hover:scale-110
                ${isCompleted 
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-500 text-white shadow-md' 
                  : 'border-gray-300 bg-white text-transparent hover:border-green-400 hover:bg-green-50 shadow-sm'}
              `}
              aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {isCompleted && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {!isCompleted && (
                <div className="w-2 h-2 bg-gray-300 rounded-full group-hover/btn:bg-green-400 transition-colors"></div>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-6 pt-0">
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        {/* Meta information */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{estimatedTime}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Interactive</span>
          </div>
        </div>
        
        {/* Action button */}
        <Link
          href={`/courses/${courseSlug}/${slug}`}
          className={`
            group/link block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5
            ${isCurrent
              ? 'bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              : isCompleted
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 border border-green-200 hover:border-green-300'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-primary-50 hover:to-purple-50 text-gray-700 hover:text-primary-700 border border-gray-200 hover:border-primary-200'}
          `}
        >
          <span className="flex items-center justify-center">
            {isCurrent ? (
              <>
                Continue Learning
                <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              </>
            ) : isCompleted ? (
              <>
                Review Module
                <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </>
            ) : (
              <>
                Start Module
                <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
        </Link>
      </div>
      
      {/* Progress indicator for current module */}
      {isCurrent && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 animate-pulse transition-all duration-300" style={{ width: '60%' }} />
        </div>
      )}
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
    </div>
  );
} 