import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { courses, Course } from '../../data/courses';
import { getContentFileBySlug, serializeMdx, getModuleFiles } from '../../lib/mdx';
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
  const { slug } = params as { slug: string };
  
  // Find the course data from our courses array
  const course = courses.find(c => c.slug === slug);
  
  if (!course) {
    return {
      notFound: true
    };
  }
  
  // Get module files for this course
  const modules = getModuleFiles(slug);
  
  // Load MDX content for the course - with error handling
  let mdxSource: MDXRemoteSerializeResult | null = null;
  let labs: any[] = [];
  
  try {
    console.log(`Attempting to load MDX for ${course.slug}`);
    const mdxFile = getContentFileBySlug('courses', course.slug);
    console.log(`MDX file found: ${!!mdxFile}`);
    console.log(`MDX content length: ${mdxFile?.content?.length || 0}`);
    console.log(`MDX frontmatter: ${JSON.stringify(mdxFile?.frontmatter)}`);
    
    if (mdxFile && mdxFile.content) {
      console.log(`Serializing MDX content...`);
      mdxSource = await serializeMdx(mdxFile.content);
      console.log(`MDX serialization result: ${!!mdxSource}`);
      
      if (mdxFile.frontmatter && Array.isArray(mdxFile.frontmatter.labs)) {
        labs = mdxFile.frontmatter.labs;
        console.log(`Found ${labs.length} labs in frontmatter`);
      }
    }
  } catch (error) {
    console.error(`Warning: MDX file not found for course ${slug}. Using fallback content.`);
    console.error(`Error details: ${error}`);
    
    // Provide minimal fallback content when the MDX file is missing
    mdxSource = await serializeMdx(`
      # ${course.title}
      
      We're working on this content. Please check back later.
    `);
  }
  
  return {
    props: {
      course,
      mdxSource,
      labs,
      modules, // Pass modules to the page component
    },
    revalidate: 3600 // Revalidate at most once per hour
  };
};

export default function CourseDetail({ course, mdxSource, labs, modules = [] }: { course: Course, mdxSource: MDXRemoteSerializeResult, labs: any[], modules?: any[] }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('overview');
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState<{[key: string]: boolean}>({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shareTooltip, setShareTooltip] = useState(false);
  const [activeLabIndex, setActiveLabIndex] = useState<number | null>(null);
  
  const sections: Section[] = [
    { title: 'Course Overview', content: mdxSource, labIndex: null, type: 'overview' },
  ];
  
  // Add labs as sections if available
  if (labs && labs.length > 0) {
    labs.forEach((lab, index) => {
      sections.push({
        title: lab.title,
        content: null,
        labIndex: index,
        type: 'topic'
      });
    });
  }
  
  useEffect(() => {
    // Check localStorage for progress
    const savedProgress = localStorage.getItem(`course-progress-${course.slug}`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    
    // Check if user has visited before
    const hasVisited = localStorage.getItem(`visited-${course.slug}`);
    if (hasVisited) {
      setShowQuickStart(false);
    } else {
      localStorage.setItem(`visited-${course.slug}`, 'true');
    }
  }, [course.slug]);
  
  // Function to mark a section as completed and navigate
  const completeAndGoNext = () => {
    // Update progress for this section
    if (currentTopic) {
      const newProgress = { ...progress };
      newProgress[currentTopic] = true;
      setProgress(newProgress);
      
      // Save to localStorage
      localStorage.setItem(`course-progress-${course.slug}`, JSON.stringify(newProgress));
      
      // Navigate back to course overview
      setCurrentTopic('overview');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{course.title} | Golang Mastery</title>
        <meta name="description" content={course.description} />
        <style>{globalStyles}</style>
      </Head>
      
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/courses" className="hover:text-indigo-600">
            Courses
          </Link>{' '}
          / <span className="text-gray-700">{course.title}</span>
        </nav>
        
        <div className="lg:flex gap-8">
          {/* Main Content Area */}
          <div className="lg:flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Course Header */}
              <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
                          {course.level}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                          {course.duration}
                        </span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                        {course.title}
                      </h1>
                    </div>
                    <div className="hidden md:block">
                      <button 
                        onClick={() => setShowProgress(!showProgress)}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
                        aria-label="Toggle progress"
                      >
                        {showProgress ? <FaTimes /> : <FaListUl />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Instructor Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <img 
                    src={course.instructorImage} 
                    alt={course.instructor} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="font-medium">{course.instructor}</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Start Guide */}
              {showQuickStart && (
                <QuickStartGuide onClose={() => setShowQuickStart(false)} />
              )}
              
              {/* Course Content */}
              <div className="p-6" ref={contentRef}>
                {currentTopic === 'overview' && (
                  <div className="animate-fadeIn">
                    <ReadableContent>
                      {/* Course Modules Section */}
                      {modules.length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
                          <div className="space-y-4">
                            {modules.map((module, index) => (
                              <Link 
                                href={`/courses/${module.path}`} 
                                key={module.slug}
                                className="block bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start">
                                  <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-lg">{module.title}</h3>
                                    <p className="text-gray-600 mt-1">{module.description}</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Table of contents for the overview */}
                      <MDXRemote {...mdxSource} components={MDXComponents} />
                    </ReadableContent>
                  </div>
                )}
                
                {/* Rest of the component remains the same */}
                
                {currentTopic !== 'overview' && (() => {
                  const section = sections.find(s => s.title === currentTopic);
                  return section && isTopicSection(section);
                })() && (
                  <div className="animate-fadeIn">
                    <ReadableContent>
                      <div className="lab-content">
                        <h2 className="text-2xl font-bold mb-4">{currentTopic}</h2>
                        <p className="text-gray-600 mb-6">
                          {activeLabIndex !== null && labs[activeLabIndex]?.description}
                        </p>
                        
                        {/* Lab content would go here */}
                        <div className="text-center py-12">
                          <div className="mb-4">
                            <FaFlask className="text-5xl text-indigo-500 mx-auto mb-4" />
                            <h3 className="text-xl font-medium">Interactive Lab</h3>
                          </div>
                          <p className="text-gray-600 max-w-md mx-auto mb-6">
                            This interactive lab is currently under development. Soon you'll be able to practice this concept directly in your browser.
                          </p>
                          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 flex items-center gap-2 mx-auto">
                            <FaPlay /> Coming Soon
                          </button>
                        </div>
                        
                        <div className="mt-12 flex justify-between">
                          <button
                            onClick={() => completeAndGoNext()}
                            className="bg-green-500 text-white px-6 py-2 rounded-md font-medium hover:bg-green-600 inline-flex items-center gap-2"
                          >
                            <FaCheckCircle /> Mark as Completed
                          </button>
                        </div>
                      </div>
                    </ReadableContent>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Rest of the component remains the same */}
        </div>
      </div>
      
      <Footer />
      
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        course={course}
      />
    </div>
  );
}

// Export the globalStyles so they can be added to _app.tsx
export { globalStyles }; 