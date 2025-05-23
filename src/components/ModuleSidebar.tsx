import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Module {
  title: string;
  slug: string;
  order?: number;
}

interface ModuleSidebarProps {
  modules: Module[];
  courseSlug: string;
  currentModuleSlug?: string;
}

export default function ModuleSidebar({ modules, courseSlug, currentModuleSlug }: ModuleSidebarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Sort modules by order if available
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

  // Filter modules based on search term
  const filteredModules = sortedModules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Simple mounting effect that always runs
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Load completed modules from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`${courseSlug}_completed`);
        if (stored) {
          const parsedModules = JSON.parse(stored);
          setCompletedModules(Array.isArray(parsedModules) ? parsedModules : []);
        }
      } catch (error) {
        console.warn('Failed to parse completed modules from localStorage:', error);
        setCompletedModules([]);
      }
    }
  }, [courseSlug, mounted]);
  
  const toggleComplete = (moduleSlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window === 'undefined') return;
    
    setCompletedModules(prev => {
      let updated;
      if (prev.includes(moduleSlug)) {
        updated = prev.filter(slug => slug !== moduleSlug);
      } else {
        updated = [...prev, moduleSlug];
      }
      
      try {
        localStorage.setItem(`${courseSlug}_completed`, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save completed modules to localStorage:', error);
      }
      return updated;
    });
  };

  const currentIndex = currentModuleSlug 
    ? sortedModules.findIndex(m => m.slug === currentModuleSlug)
    : 0;
  const progressPercentage = sortedModules.length > 0 
    ? Math.round((completedModules.length / sortedModules.length) * 100) 
    : 0;

  const getModuleNumber = (module: Module, index: number) => {
    if (module.order !== undefined) return module.order;
    const match = module.slug.match(/(\d+)/);
    return match ? parseInt(match[0]) : index + 1;
  };
  
  return (
    <>
      {/* Enhanced Mobile toggle */}
      <div className="xl:hidden sticky top-0 bg-white/95 backdrop-blur-xl z-20 border-b border-white/40 shadow-lg">
        <div className="p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/90 hover:from-blue-100/90 hover:to-indigo-100/90 text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/40 backdrop-blur-sm group"
            aria-expanded={isOpen}
            aria-label="Toggle course navigation"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                {currentIndex + 1}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-base truncate max-w-[220px]">
                  {currentModuleSlug 
                    ? sortedModules.find(m => m.slug === currentModuleSlug)?.title || 'Course Navigation'
                    : 'Course Navigation'
                  }
                </div>
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <span>{completedModules.length}/{sortedModules.length} completed</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <aside className={`
        ${isOpen ? 'block' : 'hidden'} 
        xl:block 
        w-full 
        h-full
        flex flex-col
        opacity-100
        transition-all duration-300
      `}>
        {/* Enhanced Course Progress header */}
        <div className="p-5 bg-gradient-to-br from-blue-500/8 via-indigo-500/8 to-purple-500/8 backdrop-blur-sm border-b border-white/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
              Course Progress
            </h3>
            <div className="flex items-center space-x-3">
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg animate-pulse">
                {progressPercentage}%
              </span>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="relative mb-4">
            <div className="w-full bg-white/40 rounded-full h-3 overflow-hidden shadow-inner backdrop-blur-sm border border-white/20">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                  progressPercentage > 75 ? 'bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600' : 
                  progressPercentage > 50 ? 'bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500' : 
                  progressPercentage > 25 ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' : 
                  'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"></div>
                <div className="absolute inset-0 animate-pulse bg-white/20"></div>
              </div>
            </div>
            {progressPercentage > 0 && (
              <div className="absolute right-0 -top-7 text-xs text-gray-700 font-semibold bg-white/80 px-2 py-1 rounded-lg border border-white/40">
                {completedModules.length}/{sortedModules.length}
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700 font-medium flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{completedModules.length} of {sortedModules.length} modules</span>
            </span>
            {progressPercentage === 100 && (
              <span className="flex items-center text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Complete!
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="p-4 border-b border-white/30">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="mt-2 text-xs text-gray-600 px-2">
              Found {filteredModules.length} of {sortedModules.length} modules
            </div>
          )}
        </div>
        
        {/* Enhanced Module List */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300/60 scrollbar-track-transparent hover:scrollbar-thumb-gray-400/60">
          {filteredModules.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {searchTerm ? (
                <div className="space-y-3">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="font-medium">No modules found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="font-medium">No modules available</p>
                </div>
              )}
            </div>
          ) : (
            filteredModules.map((module, index) => {
              const isActive = currentModuleSlug === module.slug;
              const isCompleted = completedModules.includes(module.slug);
              const moduleNumber = getModuleNumber(module, sortedModules.findIndex(m => m.slug === module.slug));
              
              return (
                <div 
                  key={module.slug} 
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                  className="animate-slide-up"
                >
                  <Link
                    href={`/courses/${courseSlug}/${module.slug}`}
                    className={`
                      group relative flex items-center p-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 text-blue-900 shadow-lg border-blue-200/60 backdrop-blur-sm scale-[1.02]' 
                        : isCompleted 
                          ? 'bg-gradient-to-r from-emerald-50/90 to-green-50/90 text-emerald-900 hover:shadow-lg border-emerald-200/60 backdrop-blur-sm hover:from-emerald-100/90 hover:to-green-100/90'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-white/80 hover:to-gray-50/80 hover:shadow-md border-transparent hover:border-white/40 backdrop-blur-sm'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Enhanced Module order indicator */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-lg mr-4 text-xs font-bold transition-all duration-300 shadow-sm flex-shrink-0
                      ${isActive 
                        ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg scale-110' 
                        : isCompleted 
                          ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 group-hover:from-gray-200 group-hover:to-gray-300 group-hover:scale-105'
                      }
                    `}>
                      {moduleNumber}
                    </div>
                    
                    {/* Enhanced Module title */}
                    <span className="flex-grow font-medium leading-tight pr-3 text-sm truncate">
                      {module.title}
                    </span>
                    
                    {/* Enhanced Status indicators */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {/* Completion checkbox */}
                      <button 
                        className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm
                          ${isCompleted 
                            ? 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-500 text-white shadow-md' 
                            : 'border-gray-300 bg-white/80 text-white hover:border-emerald-400 hover:bg-emerald-50/80 backdrop-blur-sm'
                          }
                        `}
                        onClick={(e) => toggleComplete(module.slug, e)}
                        aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {isCompleted && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="w-2 h-2 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-full shadow-sm animate-pulse"></div>
                      )}
                    </div>
                    
                    {/* Enhanced hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                    
                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-r-full shadow-sm"></div>
                    )}
                  </Link>
                </div>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
} 