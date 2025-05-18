import { useState, useEffect } from 'react';
import Head from 'next/head';
import ModuleSidebar from './ModuleSidebar';
import ModuleNavigation from './ModuleNavigation';
import LoadingSpinner from './LoadingSpinner';
import Container from './Container';

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
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto gap-6 px-4">
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
            <Container
              withBackground={true}
              padding="md"
              rounded="lg"
              shadow="md"
              className="mb-6"
              animation={mounted ? "fadeIn" : "none"}
            >
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
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Part of <span className="font-medium text-gray-800 dark:text-gray-300">{courseTitle}</span> course
              </p>
            </Container>
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm z-50">
                <LoadingSpinner size="lg" text="Loading module..." />
              </div>
            )}
            
            {/* Module content */}
            <Container
              withBackground={true}
              padding="md"
              rounded="lg"
              shadow="md"
              className="mb-6"
              animation={mounted ? "slideUp" : "none"}
            >
              <div className="mdx-wrapper">
                {children}
              </div>
            </Container>
            
            {/* Module navigation */}
            <Container
              animation={mounted ? "fadeIn" : "none"}
              withBackground={false}
            >
              <ModuleNavigation
                modules={modules}
                currentModuleSlug={currentModuleSlug}
                courseSlug={courseSlug}
              />
            </Container>
          </main>
        </div>
      </div>
    </>
  );
} 