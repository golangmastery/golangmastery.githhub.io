import { useState, useEffect } from 'react';
import ModuleSidebar from './ModuleSidebar';
import ModuleNavigation from './ModuleNavigation';
import LoadingSpinner from './LoadingSpinner';
import PageTitle from './PageTitle';
import { ResponsiveFlex, Show } from './ui/ResponsiveUtils';
import { cn } from '../lib/utils';

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
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Handle module completion
  const handleModuleComplete = (moduleSlug: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(`${courseSlug}_completed`) || '[]';
      const completedModules = JSON.parse(stored);
      
      if (!completedModules.includes(moduleSlug)) {
        const updated = [...completedModules, moduleSlug];
        localStorage.setItem(`${courseSlug}_completed`, JSON.stringify(updated));
        
        // Trigger a storage event to update other components
        window.dispatchEvent(new StorageEvent('storage', {
          key: `${courseSlug}_completed`,
          newValue: JSON.stringify(updated),
          oldValue: stored
        }));
      }
    } catch (error) {
      console.warn('Failed to save module completion:', error);
    }
  };
  
  return (
    <>
      <PageTitle 
        title={`${title} | ${courseTitle}`}
        description={`Learn ${title} in the ${courseTitle} course`}
      />
      
      {/* Enhanced full-screen layout with better grid system */}
      <div className={cn(
        'min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 relative transition-all duration-500',
        isLoading ? 'opacity-60' : 'opacity-100'
      )}>
        {/* Enhanced background with better patterns */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25px 25px, rgba(99, 102, 241, 0.05) 2px, transparent 0),
                radial-gradient(circle at 75px 75px, rgba(139, 92, 246, 0.05) 2px, transparent 0)
              `,
              backgroundSize: '100px 100px'
            }}
          />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-purple-400/8 to-pink-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-400/6 to-teal-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Improved grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] 2xl:grid-cols-[320px_1fr] min-h-screen relative z-10">
          {/* Enhanced Sidebar - Desktop */}
          <aside className={cn(
            'hidden xl:block sticky top-0 h-screen transition-all duration-500 ease-out bg-white/70 backdrop-blur-xl border-r border-white/30 shadow-2xl',
            mounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0',
            sidebarExpanded ? 'xl:w-80 2xl:w-96' : ''
          )}>
            <div className="h-full overflow-y-auto">
              <ModuleSidebar
                modules={modules}
                courseSlug={courseSlug}
                currentModuleSlug={currentModuleSlug}
              />
            </div>
          </aside>

          {/* Mobile Sidebar */}
          <div className="xl:hidden">
            <ModuleSidebar
              modules={modules}
              courseSlug={courseSlug}
              currentModuleSlug={currentModuleSlug}
            />
          </div>
          
          {/* Enhanced Main content area */}
          <main className="flex-1 min-h-screen">
            <div className="max-w-none h-full">
              {/* Improved container with better spacing */}
              <div className="p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 lg:space-y-6 max-w-7xl mx-auto">
                
                {/* Enhanced module header with better visual hierarchy */}
                <header className={cn(
                  'bg-white/85 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl transition-all duration-700 hover:shadow-2xl hover:bg-white/92',
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}>
                  <div className="p-5 lg:p-7 xl:p-8">
                    {/* Improved breadcrumb with better styling */}
                    <nav className="flex items-center space-x-2 text-sm mb-6 flex-wrap gap-y-2" aria-label="Breadcrumb">
                      <a 
                        href="/courses" 
                        className="group flex items-center space-x-2 hover:text-blue-700 transition-all duration-300 font-medium bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 px-4 py-2 rounded-xl border border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md"
                      >
                        <span className="text-lg">📚</span>
                        <span>Courses</span>
                      </a>
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <a 
                        href={`/courses/${courseSlug}`} 
                        className="group flex items-center space-x-2 hover:text-purple-700 transition-all duration-300 font-medium bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 px-4 py-2 rounded-xl border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow-md max-w-xs truncate"
                      >
                        <span className="text-lg">🎯</span>
                        <span className="truncate">{courseTitle}</span>
                      </a>
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="flex items-center space-x-2 text-gray-800 font-semibold bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm max-w-md truncate">
                        <span className="text-lg">📖</span>
                        <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent truncate">{title}</span>
                      </span>
                    </nav>
                    
                    {/* Enhanced header content with better layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-8 items-start">
                      <div className="flex-shrink-0">
                        <div className="group relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8 lg:h-10 lg:w-10 text-white" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                            />
                          </svg>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0 space-y-4">
                        <div>
                          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight mb-3">
                            {title}
                          </h1>
                          <p className="text-gray-700 text-base sm:text-lg lg:text-xl">
                            Part of{' '}
                            <a 
                              href={`/courses/${courseSlug}`}
                              className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 underline decoration-blue-200 hover:decoration-blue-400 decoration-2 underline-offset-2"
                            >
                              {courseTitle}
                            </a>
                            {' '}course
                          </p>
                        </div>
                        
                        {/* Enhanced module meta with better responsive design */}
                        <div className="flex flex-wrap gap-3 lg:gap-4">
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 px-4 py-2.5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-default">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-blue-800">~15 min read</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 px-4 py-2.5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-default">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="font-semibold text-purple-800">Interactive</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 px-4 py-2.5 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-default">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-emerald-800">Hands-on</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 px-4 py-2.5 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-default">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                            </svg>
                            <span className="font-semibold text-amber-800">Beginner-friendly</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
                
                {/* Enhanced module content with better typography */}
                <article className={cn(
                  'bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl transition-all duration-700 hover:shadow-2xl hover:bg-white/95',
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}>
                  <div className="p-6 lg:p-8 xl:p-10 2xl:p-12">
                    <div className="prose prose-lg xl:prose-xl 2xl:prose-2xl max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-h1:text-4xl xl:prose-h1:text-5xl prose-h1:mb-8 prose-h2:text-3xl xl:prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl xl:prose-h3:text-3xl prose-h3:mt-10 prose-h3:mb-4 prose-p:leading-relaxed prose-p:text-gray-700 prose-p:mb-6 prose-code:bg-gradient-to-r prose-code:from-gray-100 prose-code:to-gray-200 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-lg prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-gray-200 prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:to-gray-800 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:text-base prose-pre:shadow-2xl prose-pre:border prose-pre:border-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-indigo-50 prose-blockquote:rounded-r-xl prose-blockquote:pl-8 prose-blockquote:py-4 prose-blockquote:my-8 prose-a:text-blue-600 prose-a:decoration-blue-300 hover:prose-a:decoration-blue-500 prose-a:decoration-2 prose-a:underline-offset-4 prose-strong:text-gray-900 prose-em:text-gray-700 prose-li:text-gray-700 prose-li:mb-2 prose-ul:mb-8 prose-ol:mb-8">
                      <div className="mdx-wrapper space-y-6 lg:space-y-8">
                        {children}
                      </div>
                    </div>
                  </div>
                </article>
                
                {/* Enhanced module navigation */}
                <section className={cn(
                  'bg-white/85 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg transition-all duration-900 hover:shadow-xl hover:bg-white/90',
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                )}>
                  <div className="p-6 lg:p-8">
                    <ModuleNavigation
                      modules={modules}
                      currentModuleSlug={currentModuleSlug}
                      courseSlug={courseSlug}
                      onComplete={handleModuleComplete}
                    />
                  </div>
                </section>

                {/* Bottom spacing for scroll */}
                <div className="h-16 lg:h-20"></div>
              </div>
            </div>
          </main>
        </div>

        {/* Enhanced loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white/85 via-blue-50/70 to-indigo-50/70 backdrop-blur-lg z-50">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex items-center space-x-6 border border-white/40 max-w-sm">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <div className="text-gray-800 font-semibold text-lg">Loading module...</div>
                <div className="text-gray-600 text-sm mt-1">Please wait</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 