import { useState, useEffect } from 'react';
import Head from 'next/head';
import ModuleSidebar from './ModuleSidebar';
import ModuleNavigation from './ModuleNavigation';
import LoadingSpinner from './LoadingSpinner';

interface Module {
  title: string;
  slug: string;
  order?: number;
  description?: string;
}

interface ModuleContentLayoutProps {
  title: string;
  courseTitle: string;
  courseSlug: string;
  currentModuleSlug: string;
  modules: Module[];
  children: React.ReactNode;
}

export default function ModuleContentLayout({
  title,
  courseTitle,
  courseSlug,
  currentModuleSlug,
  modules,
  children
}: ModuleContentLayoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <>
      <Head>
        <title>{title} | {courseTitle}</title>
        <meta name="description" content={`Learn ${title} in the ${courseTitle} course`} />
      </Head>
      
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto gap-6">
          {/* Sidebar for module navigation */}
          <div className={`transition-transform duration-300 ease-out ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
            <ModuleSidebar
              modules={modules}
              courseSlug={courseSlug}
              currentModuleSlug={currentModuleSlug}
            />
          </div>
          
          {/* Main content area */}
          <main className="flex-1 min-w-0">
            {/* Module header */}
            <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm p-4 sm:p-6 mb-4 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Part of <span className="font-medium text-gray-800 dark:text-gray-300">{courseTitle}</span> course
              </p>
            </div>
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm z-50">
                <LoadingSpinner size="lg" text="Loading module..." />
              </div>
            )}
            
            {/* Module content */}
            <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm p-4 sm:p-6 mb-4 transition-all duration-300 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
              <div className="prose dark:prose-invert prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none">
                {children}
              </div>
            </div>
            
            {/* Module navigation */}
            <div className={`transition-all duration-300 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
              <ModuleNavigation
                modules={modules}
                currentModuleSlug={currentModuleSlug}
                courseSlug={courseSlug}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
} 