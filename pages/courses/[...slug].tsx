import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { courses, Course } from '../../data/courses';
import { getContentFileBySlug, serializeMdx, getModuleFiles } from '../../lib/mdx';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXComponents from '../../src/components/MDXComponents';
import { FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Add custom styles for content readability
const globalStyles = `
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

// ReadableContent component for optimal reading experience
function ReadableContent({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className="readable-text">
        {children}
      </div>
    </div>
  );
}

// Define interfaces for module types
interface Module {
  slug: string;
  path: string;
  title: string;
  description: string;
  order: number;
}

interface ModuleDetailProps {
  course: Course;
  moduleTitle: string;
  moduleDescription: string;
  mdxSource: MDXRemoteSerializeResult;
  prevModule: Module | null;
  nextModule: Module | null;
  allModules: Module[];
  currentModuleIndex: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string[] } }[] = [];
  
  // For each course, get its modules
  for (const course of courses) {
    const modules = getModuleFiles(course.slug);
    
    // For each module, create a path
    modules.forEach(module => {
      paths.push({
        params: {
          slug: [course.slug + '-modules', module.slug]
        }
      });
    });
  }
  
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<ModuleDetailProps> = async ({ params }) => {
  const slugArray = params?.slug as string[];
  
  if (!slugArray || slugArray.length !== 2) {
    return {
      notFound: true
    };
  }
  
  const courseModuleDir = slugArray[0]; // e.g. "quick-start-with-golang-modules"
  const moduleSlug = slugArray[1]; // e.g. "01-introduction"
  
  const courseSlug = courseModuleDir.replace('-modules', '');
  const course = courses.find(c => c.slug === courseSlug);
  
  if (!course) {
    return {
      notFound: true
    };
  }
  
  try {
    // Get all modules for this course to determine navigation
    const allModules = getModuleFiles(courseSlug);
    const currentModuleIndex = allModules.findIndex(m => m.slug === moduleSlug);
    
    if (currentModuleIndex === -1) {
      return {
        notFound: true
      };
    }
    
    // Get the previous and next modules for navigation
    const prevModule = currentModuleIndex > 0 ? allModules[currentModuleIndex - 1] : null;
    const nextModule = currentModuleIndex < allModules.length - 1 ? allModules[currentModuleIndex + 1] : null;
    
    // Get the current module content
    const mdxFile = getContentFileBySlug(`courses/${courseSlug}-modules`, moduleSlug);
    const mdxSource = await serializeMdx(mdxFile.content);
    
    return {
      props: {
        course,
        moduleTitle: mdxFile.frontmatter.title,
        moduleDescription: mdxFile.frontmatter.description,
        mdxSource,
        prevModule,
        nextModule,
        allModules,
        currentModuleIndex
      }
    };
  } catch (error) {
    console.error(`Error loading module: ${error}`);
    return {
      notFound: true
    };
  }
};

export default function ModuleDetail({ 
  course,
  moduleTitle,
  moduleDescription,
  mdxSource,
  prevModule,
  nextModule,
  allModules,
  currentModuleIndex
}: ModuleDetailProps) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{moduleTitle} | {course.title} | GolangMastery</title>
        <meta name="description" content={moduleDescription} />
        <style>{globalStyles}</style>
      </Head>
      
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/courses" className="hover:text-indigo-600">
            Courses
          </Link>{' '}
          /{' '}
          <Link href={`/courses/${course.slug}`} className="hover:text-indigo-600">
            {course.title}
          </Link>{' '}
          / <span className="text-gray-700">{moduleTitle}</span>
        </nav>
        
        {/* Module progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700 font-medium">Module {currentModuleIndex + 1} of {allModules.length}</span>
            <span className="text-indigo-600 font-medium">{Math.round(((currentModuleIndex + 1) / allModules.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentModuleIndex + 1) / allModules.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Main content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-4">{moduleTitle}</h1>
            <p className="text-gray-600 mb-8">{moduleDescription}</p>
            
            <ReadableContent>
              <MDXRemote {...mdxSource} components={MDXComponents} />
            </ReadableContent>
          </div>
          
          {/* Navigation */}
          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {prevModule ? (
                <Link 
                  href={`/courses/${course.slug}-modules/${prevModule.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous: {prevModule.title}
                </Link>
              ) : (
                <Link 
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <FaHome className="mr-2" />
                  Back to Course
                </Link>
              )}
              
              {nextModule ? (
                <Link 
                  href={`/courses/${course.slug}-modules/${nextModule.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Next: {nextModule.title}
                  <FaArrowRight className="ml-2" />
                </Link>
              ) : (
                <Link 
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Complete Course
                  <FaHome className="ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Module list */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">All Modules</h2>
          <div className="space-y-3">
            {allModules.map((module, index) => (
              <Link 
                href={`/courses/${course.slug}-modules/${module.slug}`}
                key={module.slug}
                className={`block p-3 rounded-lg ${
                  index === currentModuleIndex 
                    ? 'bg-indigo-50 border border-indigo-100 text-indigo-800' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm ${
                    index === currentModuleIndex 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={index === currentModuleIndex ? 'font-medium' : ''}>{module.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 