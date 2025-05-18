import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { courses, Course } from '../../data/courses';
import { useState, useEffect } from 'react';
import CourseCard from '../../components/CourseCard';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import { useRouter } from 'next/router';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesIndex() {
  const router = useRouter();
  const [level, setLevel] = useState('All');
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [displayedCourses, setDisplayedCourses] = useState(courses);
  
  // Handle query params for level and search
  useEffect(() => {
    const { level: queryLevel, search: querySearch } = router.query;
    
    if (queryLevel && typeof queryLevel === 'string' && LEVELS.includes(queryLevel)) {
      setLevel(queryLevel);
    }
    
    if (querySearch && typeof querySearch === 'string') {
      setSearch(querySearch);
    }
  }, [router.query]);
  
  // Filter courses based on level and search
  useEffect(() => {
    setIsSearching(true);
    
    const timer = setTimeout(() => {
      const filtered = courses.filter((course: Course) => {
        const levelMatch = level === 'All' || course.level === level;
        const searchMatch = !search.trim() || 
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.description.toLowerCase().includes(search.toLowerCase()) ||
          (course.topics && course.topics.some(topic => 
            topic.toLowerCase().includes(search.toLowerCase())
          ));
        
        return levelMatch && searchMatch;
      });
      
      setDisplayedCourses(filtered);
      setIsSearching(false);
      
      // Update URL with search params
      const queryParams = new URLSearchParams();
      if (level !== 'All') queryParams.set('level', level);
      if (search) queryParams.set('search', search);
      
      const queryString = queryParams.toString();
      router.push(
        `${router.pathname}${queryString ? `?${queryString}` : ''}`,
        undefined,
        { shallow: true }
      );
    }, 300);
    
    return () => clearTimeout(timer);
  }, [level, search, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <Head>
        <title>Golang Courses | GolangMastery</title>
        <meta name="description" content="Browse our comprehensive Golang courses - from beginner tutorials to advanced concepts and practical applications." />
        <meta property="og:title" content="Golang Courses | GolangMastery" />
        <meta property="og:description" content="Master Go programming with our structured courses for all skill levels." />
        <meta property="og:type" content="website" />
      </Head>
      
      <Header />
      
      <main className="flex-1 w-full container mx-auto px-4 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Master Go Programming
          </h1>
          <p className="text-lg text-gray-600">
            Explore our comprehensive collection of Go courses designed for every skill level.
          </p>
        </div>
        
        {/* Filter and Search Bar */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-8 sticky top-4 z-10 backdrop-blur-sm bg-white/95">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Level Filters */}
            <div className="flex gap-2 flex-wrap">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-4 py-2 rounded-full font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    level === lvl
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
                  }`}
                  aria-pressed={level === lvl}
                >
                  {lvl}
                </button>
              ))}
            </div>
            
            {/* Search input */}
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-white shadow-sm"
                aria-label="Search courses"
              />
              {search && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Applied filters display */}
          {(level !== 'All' || search) && (
            <div className="mt-3 flex items-center text-sm text-gray-600">
              <span className="mr-2">Filters:</span>
              {level !== 'All' && (
                <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 mr-2 flex items-center">
                  Level: {level}
                  <button 
                    onClick={() => setLevel('All')} 
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    aria-label={`Remove ${level} level filter`}
                  >
                    ✕
                  </button>
                </span>
              )}
              {search && (
                <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 flex items-center">
                  "{search}"
                  <button 
                    onClick={() => setSearch('')} 
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    aria-label="Remove search filter"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Course Grid */}
        {isSearching ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="md" text="Searching courses..." />
          </div>
        ) : displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCourses.map((course: Course) => (
              <CourseCard 
                key={course.slug} 
                course={course}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No courses found</h2>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for</p>
            <button
              onClick={() => {
                setLevel('All');
                setSearch('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Course statistics */}
        {displayedCourses.length > 0 && (
          <div className="mt-12 text-center text-gray-600">
            Showing {displayedCourses.length} {displayedCourses.length === 1 ? 'course' : 'courses'}
            {level !== 'All' && ` for ${level} level`}
            {search && ` matching "${search}"`}
          </div>
        )}
      </main>
      
      {/* Call to action section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to master Go programming?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our courses offer practical, hands-on learning with real-world projects to help you become proficient in Go.
          </p>
          <Link
            href="/courses/quick-start-with-golang-modules/01-introduction-to-go"
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            Start Learning Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
      
      <Footer />
      
      {/* Fade-in animation keyframes */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 