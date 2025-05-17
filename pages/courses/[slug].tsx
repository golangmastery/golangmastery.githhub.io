import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { courses, Course } from '../../data/courses';
import { getContentFileBySlug, serializeMdx } from '../../lib/mdx';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXComponents from '../../src/components/MDXComponents';
import { FaFlask, FaArrowRight, FaArrowLeft, FaBars, FaTimes, FaCheckCircle, FaBookmark, FaShare, FaDownload, FaListUl, FaTrophy, FaTwitter, FaLinkedin, FaPlay, FaLightbulb } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Define section types
interface BaseSection {
  title: string;
}

interface OverviewSection extends BaseSection {
  content: MDXRemoteSerializeResult;
  labIndex?: null;
  type: 'overview';
}

interface TopicSection extends BaseSection {
  content: null;
  labIndex: number | null;
  type: 'topic';
}

type Section = OverviewSection | TopicSection;

// Type guard to check if section is a topic section
function isTopicSection(section: Section): section is TopicSection {
  return section.type === 'topic';
}

// Add custom styles in the globalStyles
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  
  /* Typography improvements */
  .readable-text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.125rem;
    line-height: 1.8;
    color: rgba(55, 65, 81, 1);
    letter-spacing: -0.011em;
  }
  
  @media (min-width: 768px) {
    .readable-text {
      font-size: 1.1875rem;
    }
  }
  
  .readable-text p {
    margin-bottom: 1.5em;
  }
  
  .readable-text h2, .readable-text h3 {
    margin-top: 1.75em;
    margin-bottom: 0.75em;
  }
  
  .readable-text code {
    font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;
    font-size: 0.925em;
    background-color: rgba(243, 244, 246, 1);
    padding: 0.125em 0.25em;
    border-radius: 0.25em;
  }
  
  .readable-text pre {
    background-color: rgb(31, 41, 55);
    font-size: 0.875em;
    padding: 1.25em;
    border-radius: 0.375em;
    overflow-x: auto;
  }
  
  .readable-text pre code {
    background-color: transparent;
    color: rgb(228, 228, 231);
    padding: 0;
  }
`;

// ReadableContent component for optimal readability
function ReadableContent({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className="readable-text">
        {children}
      </div>
    </div>
  );
}

// TableOfContents component
function TableOfContents({ items }: { items: {id: string, title: string}[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="my-6 bg-gray-50 border border-gray-200 rounded-lg">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 flex justify-between items-center text-left"
      >
        <span className="font-medium flex items-center gap-2">
          <FaListUl className="text-indigo-500" /> Table of Contents
        </span>
        <span className="text-gray-500 text-sm">
          {isOpen ? "Hide" : "Show"}
        </span>
      </button>
      
      {isOpen && (
        <div className="p-3 pt-0 border-t border-gray-200">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Certificate Modal Component
function CertificateModal({ isOpen, onClose, course, name = '', date = new Date() }: { 
  isOpen: boolean; 
  onClose: () => void; 
  course: Course;
  name?: string;
  date?: Date;
}) {
  const [userName, setUserName] = useState(name);
  
  if (!isOpen) return null;

  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaTrophy className="text-yellow-400" /> Course Completed!
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Certificate */}
          <div className="my-6 border-8 border-double border-indigo-200 p-8 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
            <div className="text-sm uppercase tracking-wide text-indigo-500 mb-1">GolangMastery Certificate</div>
            <h3 className="text-xl md:text-2xl font-bold mb-6">Certificate of Completion</h3>
            
            <p className="mb-4">This certifies that</p>
            
            <div className="mb-4 relative">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full max-w-xs mx-auto text-center border-b-2 border-indigo-300 bg-transparent py-1 text-xl font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <p className="mb-4">has successfully completed the course</p>
            <p className="text-xl font-bold mb-4">{course.title}</p>
            <p className="mb-6">on {formattedDate}</p>
            
            <div className="flex justify-center mb-4">
              <div className="w-24 h-12 border-b border-gray-400"></div>
            </div>
            <p>Instructor Signature</p>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={() => {
                // In a real app, this would generate and download a PDF
                alert('Certificate would be downloaded in a real application');
              }}
              className="sm:w-auto w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              <FaDownload /> Download Certificate
            </button>
            
            <div className="flex gap-2">
              <button
                className="flex-1 sm:flex-none bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
                onClick={() => {
                  const url = `https://twitter.com/intent/tweet?text=I just completed ${course.title} on GolangMastery!&url=${encodeURIComponent(window.location.href)}`;
                  window.open(url, '_blank');
                }}
              >
                <FaTwitter /> Share
              </button>
              <button
                className="flex-1 sm:flex-none bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 flex items-center justify-center gap-2"
                onClick={() => {
                  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                  window.open(url, '_blank');
                }}
              >
                <FaLinkedin /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// QuickStart component for new users
function QuickStartGuide({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100 mb-6 animate-fadeIn">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-indigo-800 flex items-center gap-2">
          <FaLightbulb className="text-yellow-500" /> Quick Start Guide
        </h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close quick start guide"
        >
          <FaTimes />
        </button>
      </div>
      
      <p className="text-gray-700 mb-4">
        Welcome to the course! Here's how to get started:
      </p>
      
      <ol className="space-y-3 mb-4">
        <li className="flex gap-3">
          <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-indigo-800 text-sm font-medium">1</span>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Read the course overview</p>
            <p className="text-sm text-gray-600">Get familiar with what you'll learn and course structure</p>
          </div>
        </li>
        <li className="flex gap-3">
          <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-indigo-800 text-sm font-medium">2</span>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Progress through each topic</p>
            <p className="text-sm text-gray-600">Complete sections in order and mark them as completed</p>
          </div>
        </li>
        <li className="flex gap-3">
          <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-indigo-800 text-sm font-medium">3</span>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Practice with hands-on labs</p>
            <p className="text-sm text-gray-600">Apply what you've learned with practical exercises</p>
          </div>
        </li>
      </ol>
      
      <button
        onClick={() => {
          // In a real app, this would start a video walkthrough
          alert('Video walkthrough would start in a real application');
        }}
        className="w-full text-indigo-700 bg-white border border-indigo-200 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
      >
        <FaPlay className="text-indigo-600" /> Watch 2-min tutorial
      </button>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: courses.map((course) => ({
      params: { slug: course.slug }
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const course = courses.find((c) => c.slug === params?.slug);

  if (!course) {
    return { notFound: true };
  }

  // Load MDX content for the course
  const mdxFile = getContentFileBySlug('courses', course.slug);
  let mdxSource: MDXRemoteSerializeResult | null = null;
  let labs: any[] = [];
  if (mdxFile && mdxFile.content) {
    mdxSource = await serializeMdx(mdxFile.content);
    if (mdxFile.frontmatter && Array.isArray(mdxFile.frontmatter.labs)) {
      labs = mdxFile.frontmatter.labs;
    }
  }

  return { props: { course, mdxSource, labs } };
};

export default function CourseDetail({ course, mdxSource, labs }: { course: Course, mdxSource: MDXRemoteSerializeResult, labs: any[] }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);
  
  // Ensure labs is an array
  const safeLabs = Array.isArray(labs) ? labs : [];
  
  // Create course sections from topics
  const sections: Section[] = [
    { title: 'Overview', content: mdxSource, type: 'overview' },
    ...course.topics.map((topic, index) => ({
      title: topic,
      content: null,
      labIndex: index < safeLabs.length ? index : null,
      type: 'topic' as const
    }))
  ];

  // Navigate between pages
  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < sections.length) {
      setCurrentPage(pageIndex);
      // Scroll to top when changing pages
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  // Use isMounted pattern to avoid hydration mismatches
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load completed sections from localStorage on mount - with safety check
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`course-progress-${course.slug}`);
        if (saved) {
          setCompletedSections(JSON.parse(saved));
        }
        
        // Check for first visit - do this after mount to avoid hydration mismatch
        const hasVisited = localStorage.getItem(`visited-course-${course.slug}`);
        setShowQuickStart(!hasVisited);
        
        // Mark as visited
        if (!hasVisited) {
          localStorage.setItem(`visited-course-${course.slug}`, 'true');
        }
      } catch (e) {
        console.error('Failed to load saved progress', e);
      }
    }
  }, [isMounted, course.slug]);

  // Save completed sections to localStorage when they change - with safety check
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined' && completedSections.length > 0) {
      try {
        localStorage.setItem(
          `course-progress-${course.slug}`,
          JSON.stringify(completedSections)
        );
      } catch (e) {
        console.error('Failed to save progress', e);
      }
    }
  }, [completedSections, course.slug, isMounted]);
  
  // Keyboard navigation - with safety check
  useEffect(() => {
    if (!isMounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Left arrow key for previous page
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        goToPage(currentPage - 1);
      }
      // Right arrow key for next page
      else if (e.key === 'ArrowRight' && currentPage < sections.length - 1) {
        completeAndGoNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, sections.length, isMounted]);

  // Mark current section as completed - using safer reference
  const completeAndGoNext = () => {
    if (!completedSections.includes(currentPage)) {
      const newCompletedSections = [...completedSections, currentPage];
      setCompletedSections(newCompletedSections);
      
      // Check if this was the last section and all are now completed
      const allCompleted = newCompletedSections.length === sections.length;
      if (currentPage === sections.length - 1 && allCompleted) {
        setShowCertificate(true);
        return;
      }
    }
    goToPage(currentPage + 1);
  };

  // Calculate progress
  const progressPercentage = (completedSections.length / sections.length) * 100;

  // Show tooltip briefly
  const showTemporaryTooltip = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  // Generate table of contents sections for each topic
  const getTocForTopic = (topic: string) => {
    // In a real app, this would be derived from actual content
    // Here we're generating dummy sections for demo purposes
    return [
      { id: `${topic.toLowerCase().replace(/\s+/g, '-')}-intro`, title: 'Introduction' },
      { id: `${topic.toLowerCase().replace(/\s+/g, '-')}-concepts`, title: 'Key Concepts' },
      { id: `${topic.toLowerCase().replace(/\s+/g, '-')}-examples`, title: 'Examples' },
      { id: `${topic.toLowerCase().replace(/\s+/g, '-')}-advanced`, title: 'Advanced Usage' },
      { id: `${topic.toLowerCase().replace(/\s+/g, '-')}-summary`, title: 'Summary' },
    ];
  };

  if (router.isFallback || !course) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Current section & TOC
  const currentSection = sections[currentPage];
  const currentToc = currentPage > 0 ? getTocForTopic(currentSection.title) : [];

  // For the clipboard functionality, add a safety check
  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showTemporaryTooltip();
      }).catch(err => {
        console.error('Failed to copy URL: ', err);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{course.title} | GolangMastery</title>
        <meta name="description" content={course.description} />
        <meta property="og:title" content={`${course.title} | GolangMastery`} />
        <meta property="og:description" content={course.description} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Add structured data for course */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": course.title,
              "description": course.description,
              "provider": {
                "@type": "Organization",
                "name": "GolangMastery",
                "sameAs": "https://golangmastery.com"
              }
            })
          }}
        />
        {/* Add custom typography styles */}
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </Head>
      <Header />
      
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-indigo-700 focus:text-white"
      >
        Skip to content
      </a>
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'fixed inset-0 z-40 md:relative md:inset-auto' : 'hidden md:block'} bg-white w-full md:w-80 border-r border-gray-200 shadow-lg md:shadow-none`}>
          <div className="p-4 bg-indigo-700 text-white flex justify-between items-center">
            <h2 className="font-bold text-lg truncate">{course.title}</h2>
            <button 
              className="md:hidden text-white hover:text-indigo-200" 
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 font-medium">Progress</span>
                <span className="text-indigo-600 font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              {sections.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    goToPage(idx); 
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                    currentPage === idx 
                      ? 'bg-indigo-100 text-indigo-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  } flex items-center justify-between`}
                >
                  <span className="truncate">{section.title}</span>
                  {completedSections.includes(idx) && (
                    <FaCheckCircle className="text-green-500 ml-2 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  const pdfUrl = `/api/generate-pdf?course=${course.slug}`;
                  window.open(pdfUrl, '_blank');
                }}
                className="w-full flex items-center justify-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors"
              >
                <FaDownload /> Download materials
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div ref={contentRef} id="main-content" className="flex-grow overflow-auto px-4 md:px-8 py-6 pb-20">
          {/* Mobile header */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 hover:text-indigo-700"
              aria-label="Open table of contents"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="text-sm text-gray-500 font-medium">
              {currentPage + 1} of {sections.length}
            </div>
          </div>

          {/* Content container with improved width for readability */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{currentSection.title}</h1>
              
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
                    aria-label="Share this course"
                  >
                    <FaShare className="h-4 w-4" />
                  </button>
                  {showTooltip && isMounted && (
                    <div className="absolute right-0 -bottom-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      URL copied!
                    </div>
                  )}
                </div>
                <button
                  className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
                  aria-label="Bookmark this course"
                >
                  <FaBookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Quick Start Guide for first-time visitors - only shown after component is mounted */}
            {currentPage === 0 && showQuickStart && isMounted && (
              <QuickStartGuide onClose={() => setShowQuickStart(false)} />
            )}
            
            {/* Course content with improved readability */}
            <div className="max-w-3xl mx-auto">
              {currentPage === 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={course.instructorImage || '/images/instructor-placeholder.jpg'} 
                        alt={course.instructor}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Instructor</div>
                      <div className="font-medium">{course.instructor}</div>
                    </div>
                    <div className="border-l border-gray-200 h-10 mx-2 hidden sm:block" />
                    <div>
                      <div className="text-sm text-gray-500">Level</div>
                      <div className="font-medium">{course.level}</div>
                    </div>
                    <div className="border-l border-gray-200 h-10 mx-2 hidden sm:block" />
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-medium">{course.duration}</div>
                    </div>
                  </div>

                  {/* Course card with additional info */}
                  <div className="mt-6 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">Course Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-indigo-800 mb-1">What you'll learn</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {course.topics.slice(0, 3).map((topic, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="inline-block h-1.5 w-1.5 bg-indigo-400 rounded-full"></span>
                              {topic}
                            </li>
                          ))}
                          {course.topics.length > 3 && (
                            <li className="text-indigo-600 font-medium">+{course.topics.length - 3} more topics</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-indigo-800 mb-1">Prerequisites</h4>
                        <p className="text-sm text-gray-700">
                          Basic Go knowledge and programming fundamentals
                        </p>
                        
                        <h4 className="text-sm font-medium text-indigo-800 mt-3 mb-1">Includes</h4>
                        <ul className="text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500 h-3 w-3" />
                            {safeLabs.length} practical labs
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500 h-3 w-3" />
                            Downloadable resources
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Overview page (first page) */}
              {currentPage === 0 && mdxSource && (
                <ReadableContent>
                  <div className="prose prose-lg prose-indigo max-w-none">
                    <MDXRemote {...mdxSource} components={MDXComponents} />
                  </div>
                </ReadableContent>
              )}
              
              {/* Topic page */}
              {currentPage > 0 && (
                <div>
                  {/* Add TOC component for topics */}
                  <TableOfContents items={currentToc} />
                  
                  <ReadableContent>
                    <div className="prose prose-lg prose-indigo max-w-none">
                      <p className="text-xl font-light mb-6 text-gray-600">This section covers {currentSection.title}.</p>
                      
                      {/* We're adding ids that match our TOC items */}
                      <div id={`${currentSection.title.toLowerCase().replace(/\s+/g, '-')}-intro`}>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. 
                          Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.
                          Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue.
                        </p>
                      </div>
                      
                      <div id={`${currentSection.title.toLowerCase().replace(/\s+/g, '-')}-concepts`}>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Concepts</h2>
                        <p>
                          Fusce nec urna ut tellus accumsan venenatis. Aenean fermentum porta velit, sit amet volutpat libero viverra vel.
                          Nullam hendrerit, ipsum non aliquet semper, neque nisi molestie elit, nec imperdiet enim augue vitae nulla.
                        </p>
                      </div>
                      
                      <div id={`${currentSection.title.toLowerCase().replace(/\s+/g, '-')}-examples`}>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Examples</h2>
                        <p>
                          Here are some examples of {currentSection.title} in action:
                        </p>
                        <div className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-4 mb-4 overflow-x-auto">
                          <pre><code className="font-mono text-sm">{`
func example() {
    // Example code for ${currentSection.title}
    fmt.Println("Hello from ${currentSection.title}!")
}
                          `}</code></pre>
                        </div>
                      </div>
                      
                      <div id={`${currentSection.title.toLowerCase().replace(/\s+/g, '-')}-advanced`}>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Advanced Usage</h2>
                        <p>
                          For advanced scenarios, consider the following approaches:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                          <li>Understand the core concepts of {currentSection.title}</li>
                          <li>Apply these concepts to real-world Go programming</li>
                          <li>Solve common problems related to {currentSection.title}</li>
                        </ul>
                      </div>
                      
                      <div id={`${currentSection.title.toLowerCase().replace(/\s+/g, '-')}-summary`}>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Summary</h2>
                        <p>
                          In this section, we've covered the fundamentals of {currentSection.title}, 
                          including its implementation, common use cases, and best practices.
                        </p>
                        <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 my-6">
                          <p className="text-indigo-800 font-medium">Key Takeaway</p>
                          <p className="text-gray-700">{currentSection.title} is a powerful tool in Go programming that helps you write more efficient and maintainable code.</p>
                        </div>
                      </div>
                    </div>
                  </ReadableContent>
                  
                  {/* Lab for this topic if available */}
                  {isTopicSection(currentSection) && currentSection.labIndex !== null && currentSection.labIndex < safeLabs.length && (
                    <div className="mt-8 p-6 border-2 rounded-lg bg-blue-50 border-blue-100 shadow-sm transform transition-transform hover:scale-[1.01]">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FaFlask className="text-blue-600" /> Lab Exercise
                      </h3>
                      <p className="mb-4">{safeLabs[currentSection.labIndex].description || 'Practice what you learned in this section with a hands-on lab.'}</p>
                      <Link
                        href={`/labs/${safeLabs[currentSection.labIndex].slug || '#'}`}
                        className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Start Lab
                      </Link>
                    </div>
                  )}
                  
                  {/* Completion checkbox */}
                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={completedSections.includes(currentPage)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCompletedSections([...completedSections, currentPage]);
                          } else {
                            setCompletedSections(completedSections.filter(idx => idx !== currentPage));
                          }
                        }}
                        className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Mark as completed</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation buttons with keyboard shortcut hints */}
          <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
            <button
              onClick={() => goToPage(currentPage - 1)}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                currentPage > 0
                  ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
              }`}
              disabled={currentPage === 0}
              aria-label="Go to previous page"
            >
              <FaArrowLeft className="mr-2 h-4 w-4" />
              <span>Previous</span>
              {currentPage > 0 && (
                <span className="sr-only md:not-sr-only md:ml-1 text-xs text-gray-400">(←)</span>
              )}
            </button>
            
            <div className="text-sm text-gray-500 hidden md:block">
              {currentPage + 1} of {sections.length}
            </div>
            
            <button
              onClick={completeAndGoNext}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                currentPage < sections.length - 1
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
              }`}
              disabled={currentPage === sections.length - 1}
              aria-label={currentPage < sections.length - 1 ? "Complete and continue to next page" : "Finish course"}
            >
              {currentPage < sections.length - 1 ? (
                <>
                  Complete & Continue
                  <FaArrowRight className="ml-2 h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-1 text-xs text-indigo-200">(→)</span>
                </>
              ) : (
                'Finish Course'
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Certificate Modal - only shown after component is mounted */}
      {isMounted && (
        <CertificateModal 
          isOpen={showCertificate} 
          onClose={() => setShowCertificate(false)} 
          course={course}
        />
      )}
    </div>
  );
}

// Export the globalStyles so they can be added to _app.tsx
export { globalStyles }; 