import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Module {
  title: string;
  slug: string;
  order?: number;
}

interface ModuleNavigationProps {
  modules: Module[];
  currentModuleSlug: string;
  courseSlug: string;
  onComplete?: (slug: string) => void;
}

export default function ModuleNavigation({ 
  modules, 
  currentModuleSlug, 
  courseSlug,
  onComplete
}: ModuleNavigationProps) {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Find current module index and determine next/prev modules
  const sortedModules = [...modules].sort((a, b) => {
    // Sort by order property if available
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    // Fall back to sorting by slug if it contains numbers
    const aMatch = a.slug.match(/(\d+)/);
    const bMatch = b.slug.match(/(\d+)/);
    if (aMatch && bMatch) {
      return parseInt(aMatch[0]) - parseInt(bMatch[0]);
    }
    return a.slug.localeCompare(b.slug);
  });
  
  const currentIndex = sortedModules.findIndex(m => m.slug === currentModuleSlug);
  const prevModule = currentIndex > 0 ? sortedModules[currentIndex - 1] : null;
  const nextModule = currentIndex < sortedModules.length - 1 ? sortedModules[currentIndex + 1] : null;
  const isLastModule = currentIndex === sortedModules.length - 1;
  
  // Check if this module is marked as complete in localStorage
  useEffect(() => {
    const checkCompletion = () => {
      const completed = localStorage.getItem(`${courseSlug}_completed`);
      if (completed) {
        const completedModules = JSON.parse(completed);
        setIsComplete(completedModules.includes(currentModuleSlug));
      }
    };
    
    checkCompletion();
    window.addEventListener('storage', checkCompletion);
    return () => window.removeEventListener('storage', checkCompletion);
  }, [currentModuleSlug, courseSlug]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Left arrow for previous module
      if (e.key === 'ArrowLeft' && prevModule) {
        goToModule(prevModule.slug);
      }
      // Right arrow for next module
      if (e.key === 'ArrowRight' && nextModule) {
        goToModule(nextModule.slug);
      }
      // Spacebar to mark complete (when focused)
      if (e.code === 'Space' && e.target === document.body && !isComplete && onComplete) {
        e.preventDefault();
        markComplete();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevModule, nextModule, isComplete, onComplete]);
  
  // Function to navigate to another module with smooth transition
  const goToModule = (slug: string) => {
    setFadeOut(true);
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/courses/${courseSlug}/${slug}`);
    }, 200); // Match this with CSS transition duration
  };
  
  // Mark module as complete and navigate to next module
  const completeAndGoNext = () => {
    if (!isComplete && onComplete) {
      onComplete(currentModuleSlug);
    }
    
    if (nextModule) {
      goToModule(nextModule.slug);
    }
  };
  
  // Mark module as complete
  const markComplete = () => {
    if (onComplete) {
      onComplete(currentModuleSlug);
      
      // Update local state
      setIsComplete(true);
      
      // Show confirmation tooltip with animation
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      
      // Update localStorage directly for immediate feedback
      const stored = localStorage.getItem(`${courseSlug}_completed`) || '[]';
      const completedModules = JSON.parse(stored);
      if (!completedModules.includes(currentModuleSlug)) {
        completedModules.push(currentModuleSlug);
        localStorage.setItem(`${courseSlug}_completed`, JSON.stringify(completedModules));
      }
    }
  };
  
  return (
    <div className={`transition-all duration-200 ${fadeOut ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
      {/* Navigation controls */}
      <div className="flex justify-between items-center mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        {/* Previous button */}
        {prevModule ? (
          <button
            onClick={() => goToModule(prevModule.slug)}
            className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md px-3 py-2"
            aria-label={`Go to previous module: ${prevModule.title}`}
            disabled={isLoading}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Previous</span>
          </button>
        ) : (
          <div></div> // Empty div to maintain flexbox layout
        )}
        
        {/* Center: Complete button */}
        <div className="relative">
          {showTooltip && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 animate-fade-in">
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 h-0 w-0"></div>
              Module completed
            </div>
          )}
          <button
            onClick={markComplete}
            disabled={isComplete || isLoading}
            className={`
              flex items-center px-3 py-1.5 rounded-md text-sm font-medium border
              ${isComplete 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 cursor-default' 
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isComplete ? (
              <>
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Completed
              </>
            ) : (
              'Mark as complete'
            )}
          </button>
        </div>
        
        {/* Next button */}
        {nextModule ? (
          <button
            onClick={completeAndGoNext}
            disabled={isLoading}
            className={`
              group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors
              rounded-md px-3 py-2
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            aria-label={`Go to next module: ${nextModule.title}`}
          >
            <span className="text-sm">Next</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : isLastModule ? (
          <Link
            href={`/courses/${courseSlug}`}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-600 text-sm font-medium"
          >
            Finish Course
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </Link>
        ) : (
          <div></div> // Empty div to maintain flexbox layout
        )}
      </div>
      
      {/* Keyboard navigation hint */}
      <div className="flex justify-center mt-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-4">
          <span className="flex items-center">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mr-1 text-gray-500 dark:text-gray-400 font-mono text-xs">←</kbd>
            <span>Previous</span>
          </span>
          <span className="flex items-center">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mr-1 text-gray-500 dark:text-gray-400 font-mono text-xs">→</kbd>
            <span>Next</span>
          </span>
        </div>
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 z-50 flex items-center justify-center">
          <div className="rounded-full h-8 w-8 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
      )}
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
