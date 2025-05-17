import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MDXComponents from '../../components/MDXComponents';
import { getContentFileBySlug, getAllContentFiles, serializeMdx } from '../../lib/mdx';
import { extractHeadings } from '../../lib/toc';

export default function CoursePage({ frontmatter, mdxSource, content }) {
  const router = useRouter();
  const [headings, setHeadings] = useState([]);

  // Extract headings from content on component mount
  useEffect(() => {
    if (content) {
      const extractedHeadings = extractHeadings(content);
      setHeadings(extractedHeadings);
    }
  }, [content]);

  // Function to get the appropriate level badge style
  const getLevelBadgeStyle = (level) => {
    switch(level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{frontmatter.title} - Golang Mastery</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-sm mb-4">
              <Link href="/">
                <a className="hover:underline">Home</a>
              </Link>
              <span>/</span>
              <Link href="/courses">
                <a className="hover:underline">Courses</a>
              </Link>
              <span>/</span>
              <span>{frontmatter.title}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{frontmatter.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 text-sm rounded-full ${getLevelBadgeStyle(frontmatter.level)}`}>
                {frontmatter.level}
              </span>
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-white/20 text-white rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg text-white/90 max-w-3xl">{frontmatter.description}</p>

            <div className="mt-8 flex items-center space-x-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{frontmatter.labs ? frontmatter.labs.length : 0} labs</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Self-paced</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                {/* Table of Contents for mobile */}
                <div className="lg:hidden mb-8">
                  <MDXComponents.TableOfContents headings={headings} />
                </div>

                <div className="prose prose-lg prose-blue max-w-full w-full lg:prose-xl">
                  <MDXRemote {...mdxSource} components={MDXComponents} />
                </div>
              </div>

              {/* Back to Courses Button */}
              <div className="flex justify-start mb-8">
                <Link href="/courses">
                  <a className="bg-gray-100 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium inline-flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Courses
                  </a>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* Table of Contents for desktop */}
              <div className="hidden lg:block sticky top-24">
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Course Content</h3>
                  <MDXComponents.TableOfContents headings={headings} />
                </div>

                {/* Course Info Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Course Information</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Difficulty</h4>
                      <div className={`inline-block px-3 py-1 text-sm rounded-full ${getLevelBadgeStyle(frontmatter.level)}`}>
                        {frontmatter.level}
                      </div>
                    </div>

                    {frontmatter.tags && frontmatter.tags.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {frontmatter.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {frontmatter.labs && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Labs</h4>
                        <div className="text-gray-700 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{frontmatter.labs.length} labs included</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Labs Section */}
          {frontmatter.labs && frontmatter.labs.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-8 mt-8">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Course Labs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {frontmatter.labs.map((lab, index) => (
                  <div key={lab.slug} className="border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-100 group">
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                          {lab.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{lab.description}</p>
                        <Link href={`/labs/${lab.slug}`}>
                          <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center shadow-sm hover:shadow">
                            Start Lab
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const files = getAllContentFiles('courses');

  const paths = files.map(file => ({
    params: {
      slug: file.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: true, // Set to true to handle cases where the page doesn't exist yet
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const { frontmatter, content } = getContentFileBySlug('courses', slug);
    const mdxSource = await serializeMdx(content);

    return {
      props: {
        frontmatter,
        slug,
        mdxSource,
        content, // Pass the raw content for extracting headings
      },
    };
  } catch (error) {
    console.error(`Error loading course ${slug}:`, error);
    return {
      notFound: true,
    };
  }
}
