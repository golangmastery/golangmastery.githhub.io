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
import PageTitle from '../../src/components/PageTitle';

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

  // If getStaticProps returned notFound, this component won't even render for that path.
  // The 404 page will be shown by Next.js directly.

  return (
    <>
      <PageTitle 
        title={`${frontMatter.title} | Golang Mastery`}
        description={frontMatter.description || 'Learn Go programming'}
      />
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
  console.log('[getStaticProps courses/[...slug]] Received params:', params);

  try {
    if (!params || !params.slug || !Array.isArray(params.slug) || params.slug.length < 1) {
      console.log('[getStaticProps courses/[...slug]] Invalid params structure, returning notFound.');
      return { notFound: true };
    }

    const courseSlug = params.slug[0];
    console.log(`[getStaticProps courses/[...slug]] Processing courseSlug: ${courseSlug}`);
    
    const course = courses.find(c => c.slug === courseSlug);
    if (!course) {
      console.log(`[getStaticProps courses/[...slug]] Course data not found for slug: ${courseSlug} in data/courses. Returning notFound.`);
      return { notFound: true };
    }
    console.log(`[getStaticProps courses/[...slug]] Found course data for: ${courseSlug}`, course);

    if (params.slug.length >= 2) {
      const moduleSlug = params.slug[1];
      console.log(`[getStaticProps courses/[...slug]] Processing moduleSlug: ${moduleSlug} for course: ${courseSlug}`);
      try {
        const { frontmatter, content } = getContentFileBySlug(`courses/${courseSlug}`, moduleSlug);
        console.log(`[getStaticProps courses/[...slug]] Loaded module MDX for: courses/${courseSlug}/${moduleSlug}`, frontmatter);
        const mdxModules = getModuleFiles(courseSlug); // Renamed to avoid conflict with imported Module interface
        const currentModule = mdxModules.find(m => m.slug === moduleSlug) || { 
          slug: moduleSlug,
          title: frontmatter.title || 'Module',
          order: frontmatter.order || 999
        };
        const mdxSource = await serializeMdx(content);
        return {
          props: {
            source: mdxSource,
            frontMatter: frontmatter,
            courseSlug,
            modules: mdxModules,
            currentModule,
          },
        };
      } catch (err) {
        console.error(`[getStaticProps courses/[...slug]] Error loading module MDX for courses/${courseSlug}/${moduleSlug}:`, err);
        return { notFound: true };
      }
    } else {
      console.log(`[getStaticProps courses/[...slug]] Processing course overview for: ${courseSlug}`);
      try {
        const { frontmatter, content } = getContentFileBySlug('courses', courseSlug);
        console.log(`[getStaticProps courses/[...slug]] Loaded course overview MDX for: courses/${courseSlug}`, frontmatter);
        const mdxModules = getModuleFiles(courseSlug);
        const mdxSource = await serializeMdx(content);
        return {
          props: {
            source: mdxSource,
            frontMatter: frontmatter,
            courseSlug,
            modules: mdxModules,
            currentModule: { slug: courseSlug, title: frontmatter.title || 'Course Overview' }
          },
        };
      } catch (err) {
        console.error(`[getStaticProps courses/[...slug]] Error loading course overview MDX for courses/${courseSlug}:`, err);
        return { notFound: true };
      }
    }
  } catch (err) {
    console.error('[getStaticProps courses/[...slug]] General error:', err);
    return { notFound: true }; // Fallback notFound
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('[getStaticPaths courses/[...slug]] Generating paths...');
  const paths = courses.map(course => ({
    params: { slug: [course.slug] } 
  }));
  console.log('[getStaticPaths courses/[...slug]] Generated paths:', JSON.stringify(paths, null, 2));
  
  // TODO: For a full static export of modules, you would also need to generate paths for each module.
  // Example:
  // const allPaths = [];
  // courses.forEach(course => {
  //   allPaths.push({ params: { slug: [course.slug] } });
  //   const modules = getModuleFiles(course.slug); // Assuming this can run at build time
  //   modules.forEach(module => {
  //     allPaths.push({ params: { slug: [course.slug, module.slug] } });
  //   });
  // });

  return {
    paths: paths, // Or allPaths if you implement module path generation
    fallback: false
  };
};

export default MarkdownModule; 