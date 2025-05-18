import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { courses, Course } from '../../data/courses';
import { getContentFileBySlug, serializeMdx, getModuleFiles } from '../../src/lib/mdx';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXComponents from '../../src/components/MDXComponents';
import ModuleContentLayout from '../../src/components/ModuleContentLayout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import Error from 'next/error';
import Container from '../../src/components/Container';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import CodeBlock from '../../src/components/CodeBlock';
import PageWrapper from '../../src/components/PageWrapper';

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
  moduleSlug: string;
}

interface MarkdownModuleProps {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    description?: string;
    [key: string]: any;
  };
  courseSlug: string;
  modules: Array<{
    slug: string;
    title: string;
    order?: number;
    [key: string]: any;
  }>;
  currentModule: {
    slug: string;
    title: string;
    order?: number;
    [key: string]: any;
  };
}

function MarkdownModule({ source, frontMatter, courseSlug, modules, currentModule }: MarkdownModuleProps) {
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);
  
  // If the page is not yet generated, show a loading state
  if (router.isFallback) {
    return (
      <Container>
        <div className="py-20 flex justify-center items-center">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    );
  }

  // If there was an error loading the content
  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{frontMatter.title} | Golang Mastery</title>
        <meta name="description" content={frontMatter.description || 'Learn Go programming'} />
      </Head>
      <PageWrapper>
        <Container maxWidth="xl" padding="lg" className="my-8">
          <div className="glass-effect p-6 sm:p-8 rounded-xl content-animate-in">
            <ModuleContentLayout
              title={frontMatter.title}
              courseTitle="Golang Mastery"
              modules={modules}
              courseSlug={courseSlug} 
              currentModuleSlug={currentModule.slug}
            >
              <MDXRemote {...source} components={MDXComponents} />
            </ModuleContentLayout>
          </div>
        </Container>
      </PageWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || !params.slug || !Array.isArray(params.slug) || params.slug.length < 1) {
      return { notFound: true };
    }

    const courseSlug = params.slug[0];
    
    // Find course from data file
    const course = courses.find(c => c.slug === courseSlug);
    if (!course) {
      return { notFound: true };
    }

    // Get module content
    if (params.slug.length >= 2) {
      const moduleSlug = params.slug[1];
      
      try {
        // Attempt to load the specific module
        const { frontmatter, content } = getContentFileBySlug(`courses/${courseSlug}`, moduleSlug);
        
        // Get all modules for this course for navigation
        const modules = getModuleFiles(courseSlug);
        
        // Find current module in the list
        const currentModule = modules.find(m => m.slug === moduleSlug) || { 
          slug: moduleSlug,
          title: frontmatter.title || 'Module',
          order: frontmatter.order || 999
        };
        
        // Serialize MDX content for rendering
        const mdxSource = await serializeMdx(content);
        
        return {
          props: {
            source: mdxSource,
            frontMatter: frontmatter,
            courseSlug,
            modules,
            currentModule,
          },
        };
      } catch (err) {
        console.error(`Error loading module ${moduleSlug}:`, err);
        return { notFound: true };
      }
    } else {
      // If no specific module is requested, load the course overview page
      try {
        const { frontmatter, content } = getContentFileBySlug('courses', courseSlug);
        const modules = getModuleFiles(courseSlug);
        
        const mdxSource = await serializeMdx(content);
        
        return {
          props: {
            source: mdxSource,
            frontMatter: frontmatter,
            courseSlug,
            modules,
            currentModule: { slug: courseSlug, title: frontmatter.title || 'Course Overview' }
          },
        };
      } catch (err) {
        console.error(`Error loading course ${courseSlug}:`, err);
        return { notFound: true };
      }
    }
  } catch (err) {
    console.error('Error in getStaticProps:', err);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // For initial build, pre-render only the course index pages
  // Individual module pages will be generated on-demand
  const paths = courses.map(course => ({
    params: { slug: [course.slug] }
  }));
  
  return {
    paths,
    // Enable on-demand generation for module pages
    fallback: 'blocking'
  };
};

export default MarkdownModule; 