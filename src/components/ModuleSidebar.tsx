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
  
  // Sort modules by order if available
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
  
  // Load completed modules from localStorage on client side
  useEffect(() => {
    const stored = localStorage.getItem(`${courseSlug}_completed`);
    if (stored) {
      setCompletedModules(JSON.parse(stored));
    }
  }, [courseSlug]);
  
  const toggleComplete = (moduleSlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setCompletedModules(prev => {
      let updated;
      if (prev.includes(moduleSlug)) {
        updated = prev.filter(slug => slug !== moduleSlug);
      } else {
        updated = [...prev, moduleSlug];
      }
      
      // Save to localStorage
      localStorage.setItem(`${courseSlug}_completed`, JSON.stringify(updated));
      return updated;
    });
  };

  // Calculate the current module index and progress percentage
  const currentIndex = currentModuleSlug 
    ? sortedModules.findIndex(m => m.slug === currentModuleSlug)
    : 0;
  const progressPercentage = Math.round((completedModules.length / sortedModules.length) * 100);
  
  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden p-4 sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-sm rounded-md dark:shadow-gray-800/40 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          aria-expanded={isOpen}
        >
          <span className="font-medium">
            {currentModuleSlug 
              ? sortedModules.find(m => m.slug === currentModuleSlug)?.title || 'Module Navigation'
              : 'Module Navigation'
            }
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <aside className={`
        ${isOpen ? 'block' : 'hidden'} 
        md:block 
        bg-white 
        dark:bg-gray-800
        border
        border-gray-200 
        dark:border-gray-700
        w-full 
        md:w-64 
        md:sticky 
        md:top-4 
        md:self-start 
        md:h-[calc(100vh-4rem)] 
        md:overflow-y-auto
        shadow-sm
        rounded-md
        transition-all
        duration-200
      `}>
        {/* Course Progress header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Progress</h3>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-xs px-2 py-1 rounded-md">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                progressPercentage > 75 ? 'bg-green-500 dark:bg-green-600' : 
                progressPercentage > 25 ? 'bg-gray-500 dark:bg-gray-500' : 
                'bg-gray-400 dark:bg-gray-400'
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex justify-between">
            <span>{completedModules.length} of {sortedModules.length} completed</span>
            {progressPercentage === 100 && (
              <span className="text-green-500 dark:text-green-400 font-medium">Complete</span>
            )}
          </div>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            {sortedModules.map((module, index) => {
              const isActive = currentModuleSlug === module.slug;
              const isCompleted = completedModules.includes(module.slug);
              
              return (
                <li key={module.slug} style={{ transitionDelay: `${index * 20}ms` }} 
                    className="transition-all duration-200 ease-out">
                  <Link
                    href={`/courses/${courseSlug}/${module.slug}`}
                    className={`
                      group flex items-center py-2 px-3 rounded-md text-sm
                      ${isActive 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium' 
                        : isCompleted 
                          ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Module order number if available */}
                    {module.order !== undefined && (
                      <span className={`
                        flex items-center justify-center w-5 h-5 rounded-md mr-3 text-xs
                        ${isActive 
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200' 
                          : isCompleted 
                            ? 'bg-green-100 dark:bg-green-800/20 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }
                      `}>
                        {module.order}
                      </span>
                    )}
                    
                    <span className="flex-grow truncate">{module.title}</span>
                    
                    {/* Completion checkbox */}
                    <button 
                      className={`
                        w-5 h-5 rounded-sm border flex items-center justify-center transition-all duration-200
                        ${isCompleted 
                          ? 'bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600 text-white' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-white group-hover:border-gray-400 dark:group-hover:border-gray-500'
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
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
} 