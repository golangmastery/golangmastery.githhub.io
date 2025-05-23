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
  const [mounted, setMounted] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  
  // Find current module index and determine next/prev modules
  const sortedModules = [...modules].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
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
  
  // Set mounted state for proper hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkCompletion = () => {
        const completed = localStorage.getItem(`${courseSlug}_completed`);
        if (completed) {
          try {
            const completedModules = JSON.parse(completed);
            setCompletedModules(completedModules);
            setIsComplete(completedModules.includes(currentModuleSlug));
          } catch (error) {
            console.warn('Failed to parse completed modules:', error);
            setIsComplete(false);
          }
        }
      };
      
      checkCompletion();
      window.addEventListener('storage', checkCompletion);
      return () => window.removeEventListener('storage', checkCompletion);
    }
  }, [currentModuleSlug, courseSlug]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevModule) {
        goToModule(prevModule.slug);
      }
      if (e.key === 'ArrowRight' && nextModule) {
        goToModule(nextModule.slug);
      }
      if (e.code === 'Space' && e.target === document.body && !isComplete) {
        e.preventDefault();
        markComplete();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevModule, nextModule, isComplete]);
  
  const goToModule = (slug: string) => {
    setFadeOut(true);
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/courses/${courseSlug}/${slug}`);
    }, 200);
  };
  
  const completeAndGoNext = () => {
    if (!isComplete) {
      markComplete();
    }
    
    if (nextModule) {
      goToModule(nextModule.slug);
    }
  };
  
  const markComplete = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(`${courseSlug}_completed`) || '[]';
      const completedModules = JSON.parse(stored);
      
      if (!completedModules.includes(currentModuleSlug)) {
        const updated = [...completedModules, currentModuleSlug];
        localStorage.setItem(`${courseSlug}_completed`, JSON.stringify(updated));
        setIsComplete(true);
        setCompletedModules(updated);
        
        // Call the onComplete callback if provided
        if (onComplete) {
          onComplete(currentModuleSlug);
        }
        
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2500);
      }
    } catch (error) {
      console.warn('Failed to mark module as complete:', error);
    }
  };
  
  return (
    <div className={`space-y-8 transition-all duration-300 ${fadeOut ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
      {/* Enhanced Progress indicator */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span>Your Progress</span>
          </h3>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-600">
              {currentIndex + 1} of {sortedModules.length} modules
            </span>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              {Math.round(((currentIndex + 1) / sortedModules.length) * 100)}%
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${((currentIndex + 1) / sortedModules.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"></div>
              <div className="absolute inset-0 animate-pulse bg-white/20"></div>
            </div>
          </div>
          <div className="flex justify-between mt-3 text-sm text-gray-600">
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Started</span>
            </span>
            <span className="font-semibold">{Math.round(((currentIndex + 1) / sortedModules.length) * 100)}% Complete</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Navigation controls */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Enhanced Previous button */}
            <div className="lg:col-span-1">
              {prevModule ? (
                <button
                  onClick={() => goToModule(prevModule.slug)}
                  disabled={isLoading}
                  className="group w-full h-full flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  aria-label={`Go to previous module: ${prevModule.title}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-500">Previous</div>
                      <div className="text-base font-semibold text-gray-800 truncate max-w-[180px]">{prevModule.title}</div>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 rounded-2xl bg-gray-50 text-gray-400 border border-gray-100">
                  <div className="text-center space-y-2">
                    <svg className="w-8 h-8 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium">No previous module</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Enhanced Center: Complete button */}
            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="relative">
                {showTooltip && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm rounded-xl px-4 py-2 z-10 animate-bounce shadow-lg">
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                    🎉 Module completed!
                  </div>
                )}
                <button
                  onClick={markComplete}
                  disabled={isComplete || isLoading}
                  className={`
                    group flex items-center justify-center px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 transform hover:scale-105 min-w-[180px] shadow-lg
                    ${isComplete 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/30 cursor-default scale-105' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-blue-500/30 hover:shadow-blue-500/50'}
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isComplete ? (
                    <>
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Completed
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mark Complete
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Enhanced Next button */}
            <div className="lg:col-span-1">
              {nextModule ? (
                <button
                  onClick={completeAndGoNext}
                  disabled={isLoading}
                  className="group w-full h-full flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                  aria-label={`Go to next module: ${nextModule.title}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-500">Next</div>
                      <div className="text-base font-semibold text-blue-800 truncate max-w-[180px]">{nextModule.title}</div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ) : isLastModule ? (
                <Link
                  href={`/courses/${courseSlug}`}
                  className="group w-full h-full flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 transition-all duration-300 transform hover:scale-[1.02] border border-green-200 hover:border-green-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-500">Finish Course</div>
                      <div className="text-base font-semibold text-green-800">View certificate</div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 rounded-2xl bg-gray-50 text-gray-400 border border-gray-100">
                  <div className="text-center space-y-2">
                    <svg className="w-8 h-8 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm font-medium">No next module</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Enhanced Keyboard navigation hint */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-100">
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 font-mono text-xs">←</kbd>
              <span className="font-medium">Previous</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 font-mono text-xs">Space</kbd>
              <span className="font-medium">Complete</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 font-mono text-xs">→</kbd>
              <span className="font-medium">Next</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-10 flex items-center space-x-6 border border-gray-200 max-w-md">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <div className="text-gray-800 font-bold text-xl">Loading next module...</div>
              <div className="text-gray-600 text-sm mt-1">Please wait while we prepare your content</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
